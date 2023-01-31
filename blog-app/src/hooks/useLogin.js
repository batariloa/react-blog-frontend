import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "./useAuthContext";
import axiosClient from "../http/axios";
import { url } from "../global/variables";

export const useLogin = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();

  const { dispatch } = useAuthContext();
  const abortController = new AbortController();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    await new Promise((resolve) => setTimeout(resolve, 3000));
    try {
      const res = await axiosClient.post(
        url + "/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
          signal: abortController.signal,
        }
      );
      dispatch({ type: "LOGIN", payload: res.data });
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      if (err.name === "CanceledError") {
        console.log("Canceled login.");
      } else {
        console.log("some other error", err);
        setError("Incorrect credentials.");
      }
    }
  };

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, [url]);

  return { login, error, isLoading, isLoading };
};
