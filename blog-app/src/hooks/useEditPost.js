import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import { url } from "../global/variables";
import axiosClient from "../http/axios";

export const useEditPost = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuthContext();

  const editPost = async (id, title, text) => {
    setIsLoading(true);
    setError(null);
    await axiosClient
      .put(
        url + "/post/" + id,
        {
          Title: title,
          Text: text,
        },
        {
          headers: {
            Authorization: `Bearer ` + user.token,
          },
        }
      )
      .catch(() => {
        setError("Please fill all fields.");
      });

    setIsLoading(false);
  };

  return { editPost, error, isLoading };
};
