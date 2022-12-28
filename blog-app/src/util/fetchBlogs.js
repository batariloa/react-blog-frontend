import { url } from "../global/variables";
import axiosClient from "../http/axios";

export const fetchData = (user, username, setData, navigate) => {
  let urlFetch = url + "/post/";
  if (username) urlFetch = url + "/post/" + username;

  const callApi = async () => {
    await axiosClient
      .get(urlFetch, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((e) => {
        if (e.response.status === 404) {
          navigate("/404");
        }
      });
  };
  if (user) callApi();
  else navigate("/login");
};
