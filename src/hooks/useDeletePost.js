import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import axiosClient from "../http/axios";
import { url } from "../global/variables";

export const useDeletePost = () => {
  const [error, setError] = useState();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState();

  const deletePost = async (id) => {
    setIsLoading(true);
    setError(null);

    axiosClient
      .delete(
        url + "/post/" + id,

        {
          headers: {
            Authorization: `Bearer ` + user.token,
          },
        }
      )

      .catch((error) => {
        setError(error);
      });

    setIsLoading(false);
  };

  return { deletePost, error, isLoading };
};
