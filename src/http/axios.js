import axios from "axios";
import { url } from "../global/variables";
const axiosClient = axios.create({
  baseURL: "https://blogster-frontend.herokuapp.com/",
  withCredentials: true,
});

export const setupInterceptors = (dispatch, navigate) => {
  axiosClient.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response && error.response.status === 401) {
        if (error.response.status === 401) localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
      }

      return Promise.reject(error);
    }
  );
};

export default axiosClient;
