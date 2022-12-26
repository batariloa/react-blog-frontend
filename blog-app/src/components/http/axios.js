import axios from "axios";
import { url } from "../../global/variables";
const axiosClient = axios.create({ baseURL: url });

export const setupInterceptors = (dispatch) => {
  axiosClient.interceptors.response.use(
    function (config) {
      // Do something before request is sent
      return config;
    },
    function (error) {
      // Do something with request error
      if (error.response.status === 401) {
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
      }
      return Promise.reject(error);
    }
  );
};

export default axiosClient;
