const express = require("express");
const router = express.Router();

// Route --------- GET api/auth
// Description --- Get logged in user(You're already logged in. You're in a protected route. You just want to be verified that you're actually logged in)
// Access -------- Private
router.get("/", (req, res) => {
  res.send("Get logged in user");
});

// Route --------- POST api/auth
// Description --- Authenticate user and get token(aka login and then get token)
// Access -------- Public
router.post("/", (req, res) => {
  res.send("Log in user");
});

// Later make it possible to delete a user and edit their details
module.exports = router;
