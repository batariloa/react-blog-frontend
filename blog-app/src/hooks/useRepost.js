import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axiosClient from "../components/http/axios";
import { url } from "../global/variables";

export const useRepost = () => {
  const { user } = useAuthContext();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const repost = async (id) => {
    setIsLoading(true);
    setError(null);

    await axiosClient
      .post(
        url + "/post/repost/" + id,
        {},
        {
          headers: {
            Authorization: `Bearer ` + user.token,
          },
        }
      )
      .catch((e) => {
        setError("An error occured.");
        console.log("An error occured while trying to repost.");
      });

    setIsLoading(false);
  };

  return { repost, error, isLoading };
};
