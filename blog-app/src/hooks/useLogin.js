import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axiosClient from "../http/axios";
import { url } from "../global/variables";

export const useLogin = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();

  const { dispatch } = useAuthContext();

  const login = async (Email, Password) => {
    setIsLoading(true);
    setError(null);

    await axiosClient
      .post(
        url + "/auth/login",
        {
          Email,
          Password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res.data });
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch((err) => {
        setError("Incorrect credentials.");
      });

    setIsLoading(false);
  };

  return { login, error, isLoading };
};
