const instance = require( "./axiosInstance" )

const callAxios = async (method, url, data) => {
  let response;
  switch (method) {
    case "PUT":
      response = await instance.put(url, data);
      break;
    case "POST":
      response = await instance.post(url, data);
      break;

    case "GET":
      response = await instance.get(url, data);
      break;

    case "DELETE":
      response = await instance.delete(url, data);
      break;

    default:
      break;
  }
};

module.exports = callAxios;

