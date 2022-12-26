import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axiosClient from "../components/http/axios";
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
        console.log("lemme get message", err);
        setError(err.response.data);
      });

    setIsLoading(false);
  };

  return { register, error, isLoading };
};
