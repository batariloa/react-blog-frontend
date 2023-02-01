import axios from "axios";
import { url } from "../global/variables";
const axiosClient = axios.create({ baseURL: url, withCredentials: true });
let isAlready401 = false;
let originalRequest;

export const setupInterceptors = (dispatch, navigate) => {
  axiosClient.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response && error.response.status === 401) {
        if (!isAlready401) {
          isAlready401 = true;
          originalRequest = error.config;
          axiosClient
            .post(url + "/auth/refresh-token", { withCredentials: true })
            .then((res) => {
              // retry the original request
              isAlready401 = false;
              return axiosClient(originalRequest);
            })
            .catch((error) => {
              isAlready401 = false;
              if (error.response.status === 401)
                localStorage.removeItem("user");
              dispatch({ type: "LOGOUT" });
            });
        }
      }
      return Promise.reject(error);
    }
  );
};

export default axiosClient;
