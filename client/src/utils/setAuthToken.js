import instance from "./axiosInstance";

const setAuthToken = token => {
  if (token) {
    instance.defaults.headers.common["inventory-app-token"] = token;
  } else {
    delete instance.defaults.headers.common["inventory-app-token"];
  }
};

export default setAuthToken;
