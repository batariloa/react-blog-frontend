import { useState } from "react";
import axiosClient from "../http/axios";
import { url } from "../global/variables";

export const useRegister = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();

  const register = async (firstname, lastname, username, email, password) => {
    setIsLoading(true);
    setError(null);

    await axiosClient
      .post(
        url + "/auth/register",
        {
          firstname,
          lastname,
          username,
          email,
          password,
          repeatPassword: password,
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
