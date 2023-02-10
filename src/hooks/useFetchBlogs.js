import { url } from "../global/variables";
import axiosClient from "../http/axios";
import { useEffect, useRef } from "react";

export const useFetchBlog = (user, usernameOrNull, setData, navigate) => {
  let urlFetch = url + "/post";
  if (usernameOrNull != null) urlFetch = url + "/post/" + usernameOrNull;

  const controller = useRef(new AbortController());
  const callApi = async () => {
    await axiosClient
      .get(urlFetch, {
        headers: {},
        withCredentials: true,
        signal: controller.current.signal,
      })

      .then((response) => {
        console.log("a pozvao sam", urlFetch);
        console.log("Fetched data", response.data);
        setData(response.data);
      })
      .catch((e) => {
        if (e.name === "CanceledError") {
          console.log("Canceled fetch");
        } else if (e.reponse.status && e.response.status === 404) {
          navigate("/404");
        }
      });
  };

  useEffect(() => {
    controller.current = new AbortController();
    if (user) {
      callApi();
    } else navigate("/login");

    return () => {
      controller.current.abort();
    };
  }, []);
};
