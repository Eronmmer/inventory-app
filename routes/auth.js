const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authenticator = require("../middleware/authenticator");

// Route --------- GET api/auth
// Description --- Get logged in user(You're already logged in. You're in a protected route. You just want to be verified that you're actually logged in)
// Access -------- Private
router.get("/", authenticator, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(["-password", "-_id", "-date", "-__v"]);

    res.json({msg: "User authenticated", user});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route --------- POST api/auth
// Description --- Authenticate user and get token(aka login and then get token)
// Access -------- Public
router.post(
  "/",
  [
    check("email", "Please include a valid email address")
      .optional({ checkFalsy: true })
      .isEmail(),
    check(
      "password",
      "Your password must be at least 5 characters long"
    ).isLength({ min: 5 }),
    check(
      "username",
      "Your username is definitely more than four characters. :-)"
    )
      .optional({ checkFalsy: true })
      .isLength({ min: 4 })
    // This above is the shit. .optional passed along with .isLength is used to tell the validator that despite the fact that "company" is an optional field, if it's included, it must not be less than four characters.
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      let user;
      if (username) {
        const findUsername = await User.findOne({ username });
        if (!findUsername) {
          return res
            .status(400)
            .json({ msg: "Invalid username. User not found" });
        }
        user = findUsername;
      }
      if (email) {
        const findEmail = await User.findOne({ email });
        if (!findEmail) {
          return res.status(400).json({ msg: "Invalid email. User not found" });
        }
        user = findEmail;
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Password is incorrect!" });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 36000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token, msg: "Logged in successfully." });
        }
      );
    } catch (err) {}
  }
);

module.exports = router;
