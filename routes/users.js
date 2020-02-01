const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const authenticator = require("../middleware/authenticator");

// Route --------- POST api/users
// Description --- Register users
// Access -------- Public
router.post(
  "/",
  [
    // validate client response via express-validator
    check("name")
      .isLength({ min: 5 })
      .withMessage("Your name must be at least 5 characters long"),
    check("email")
      .isEmail()
      .withMessage("Please include a valid email address"),
    check("username")
      .isLength({ min: 4 })
      .withMessage("Your username must be at least 4 characters long"),
    check("password", "Your password must be at least 5 characters long")
      .not()
      .isIn(["password", 123, "god"])
      .withMessage("Do not use a common word as your password")
      .isLength({ min: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, username, password, company } = req.body;

    try {
      let user = await User.findOne({ email });
      let findUsername = await User.findOne({ username });

      // Check that no two users are created that have the same email and usernames

      if (user && findUsername) {
        return res.status(400).json({
          msg: "User already exists!. Choose another email and username"
        });
      }
      if (user) {
        return res.status(400).json({
          msg: "User already exists!. Choose another email"
        });
      }

      if (findUsername) {
        return res
          .status(400)
          .json({ msg: "User already exists!. Choose another username" });
      }

      // const memberSince = await date.slice( 0, 10 ).split( "-" ).join( "/" );
      // const shit = await User.findOne({email: "johndoe@gmail.com"})
      // console.log( shit.date )
      // return

      user = new User({
        name,
        email,
        username,
        password,
        company
      });

      // hash password with bcrypt
      const salt = await bcrypt.genSalt(10);
      // The above asynchronously creates a salt

      user.password = await bcrypt.hash(password, salt);
      // The above asynchronously generates a hashed version of the string password

      // save user to database
      await user.save();

      // create jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      };

      // sign the payload
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token, msg: "User successfully created!" });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Edit a user's details
router.put(
  "/:userId",
  [
    authenticator,
    [
      check("email", "Please include a valid email address")
        .optional({ checkFalsy: true })
        .isEmail(),
      check("password", "Your password must be at least 5 characters long")
        .optional({ checkFalsy: true })
        .isLength({ min: 5 }),
      check("username", "Your username must be more than four characters.")
        .optional({ checkFalsy: true })
        .isLength({ min: 4 })
        .isLength({ min: 5 }),
      check("name", "Your name must be at least five characters.")
        .optional({ checkFalsy: true })
        .isLength({ min: 4 })
        .isLength({ min: 5 }),
      check("company", "You company name must be at least 4 characters")
        .optional({ checkFalsy: true })
        .isLength({ min: 4 })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }
    try {
      let user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ msg: "User does not exist!!" });
      }

      if (user._id.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Not authorized" });
      }

      const { name, email, password, username, company } = req.body;

      // check if email or username is already taken
      const checkUsername = await User.findOne({username})
      const checkEmail = await User.findOne({email})

      if ( checkUsername && checkEmail ) {
        return res.status(400).json({msg: "Username and Email are already taken"})
      }
      if ( checkUsername ) {
        return res.status( 400 ).json( { msg: "Username is already taken" } )
      }
      if ( checkEmail) {
        return res.status(400).json({msg: "Email is already taken"})
      }

      let userField = {};
      if (name) {
        userField.name = name;
      }
      if (email) {
        userField.email = email;
      }
      if (password) {
        // hash password and save
        const salt = await bcrypt.genSalt(10);
        userField.password = await bcrypt.hash(password, salt);
      }
      if (username) {
        userField.username = username;
      }
      if (company) {
        userField.company = company;
      }

      user = await User.findByIdAndUpdate(
        req.params.userId,
        { $set: userField },
        { new: true }
      );

      // create new jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ msg: "Successfully updated!", token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Route -------- DELETE /api/auth
// access -------  Private
// Desc -------- Delete a user's account
router.delete("/", authenticator, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User does not exist!!" });
    }

    if (user._id.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    user = await User.findByIdAndDelete(req.user.id);

    res.json({ msg: "Account successfully deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Later, make it possible to delete a user and edit one's details
// Update,👆 done 😁
module.exports = router;
