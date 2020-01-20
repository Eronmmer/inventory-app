const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  const token = req.header("inventory-app-token");

  if (!token) {
    return res.status(401).json({ msg: "Authorization denied!" });
  }

  try {
    // Pull out resource initially stored via jsonwebtoken
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: "Authorization denied" });
  }
};
