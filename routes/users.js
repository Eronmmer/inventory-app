const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Route --------- POST api/users
// Description --- Register users
// Access -------- Public
router.post("/", async (req, res) => {
  const { name, email, username, password, company } = req.body;

  try {
    let user = await User.findOne({ email, username });
    // Check that no two users are created that have the same email and usernames

    if (user) {
      return res.status(400).json({
        msg: "User already exists!. Choose another username or email"
      });
    }

    user = new User({
      name,
      email,
      username,
      email,
      password,
      company
    });

    // hash password with bycrypt

    // save user to database
    await user.save();
    res.json({msg: "User successfully created!"})
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});


// Later, make it possible to delete a user and edit one's details
module.exports = router;
