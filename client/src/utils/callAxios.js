import instance from "./axiosInstance";

const callAxios = async (method, url, data) => {
  let response;
  switch (method) {
    case "PUT":
      response = await instance.put(url, data);
      return response;

    case "POST":
      response = await instance.post(url, data);
      return response;

    case "GET":
      response = await instance.get(url, data);
      return response;

    case "DELETE":
      response = await instance.delete(url, data);
      return response;

    default:
      break;
  }
};

export default callAxios;
