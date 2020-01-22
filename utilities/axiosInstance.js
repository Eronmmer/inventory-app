const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:3500/api/"
});

module.exports = instance;
