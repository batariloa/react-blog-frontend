import { useState } from "react";
import axiosClient from "../http/axios";
import { url } from "../global/variables";

export const useRegister = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();

  const register = async (Firstname, Lastname, Username, Email, Password) => {
    setIsLoading(true);
    setError(null);

    await axiosClient
      .post(
        url + "/auth/register",
        {
          Firstname,
          Lastname,
          Username,
          Email,
          Password,
          ConfirmPassword: Password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .catch((err) => {
        if (err.response.data.title) setError(err.response.data.title);
        else if (err.response.data) setError(err.response.data);
      });

    setIsLoading(false);
  };

  return { register, error, isLoading };
};
