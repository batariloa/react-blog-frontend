import { url } from "../global/variables";
import axiosClient from "../http/axios";

export const fetchBlog = (user, usernameOrNull, setData, navigate) => {
  let urlFetch = url + "/post";
  if (usernameOrNull != null) urlFetch = url + "/post/" + usernameOrNull;

  const callApi = async () => {
    await axiosClient
      .get(urlFetch, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((response) => {
        console.log("a pozvao sam", urlFetch);
        console.log("Fetched data", response.data);
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
