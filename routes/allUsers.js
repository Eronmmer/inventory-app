const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Method ------- GET
// Desc   ------- Get list of all registered users
// Access ------- Public
router.get("/", async (req, res) => {
  // Get all users.
  try {
    const allUsers = await User.find().select([
      "-password",
      "-_id",
      "-__v",
      "-date"
    ] ).sort( { date: -1 } );
    res.json( allUsers );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
