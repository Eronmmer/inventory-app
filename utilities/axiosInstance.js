const axios = require("axios");
const os = require( "os" );

const port = process.env.PORT || 3500;
const host = process.env.HOST || os.hostname();

const instance = axios.create({
  baseURL: "/api/"
});

module.exports = instance;
