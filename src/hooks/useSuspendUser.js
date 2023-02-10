import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import axiosClient from "../http/axios";
import { url } from "../global/variables";
export const useSuspendUser = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const suspend = async (username) => {
    setIsLoading(true);
    setError(null);
    await axiosClient
      .put(
        url + "/auth/ban/" + username,
        {},
        {
          headers: {
            Authorization: `Bearer ` + user.token,
          },
        }
      )
      .catch(() => {
        setError("An error occured.");
      });

    setIsLoading(false);
  };

  return { suspend, error, isLoading };
};
