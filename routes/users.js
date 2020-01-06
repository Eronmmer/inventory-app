const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
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
        email,
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

     
      // user = await User.findOne({ email });
      // console.log(user._id, {...user, memberSince: user.date})
      // console.log(user.date.toString())
      // user = await User.findByIdAndUpdate(
      //   user._id, { $set: { memberSince: user.date } },
      //   { new: true }
      // );

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

// Later, make it possible to delete a user and edit one's details
module.exports = router;
