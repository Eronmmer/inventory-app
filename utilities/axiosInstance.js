const axios = require("axios");
const os = require( "os" );

const port = process.env.PORT || 3500;
const host = process.env.HOST || os.hostname();

const instance = axios.create({
  baseURL: `http://${host}:${port}/api/`
});

module.exports = instance;
