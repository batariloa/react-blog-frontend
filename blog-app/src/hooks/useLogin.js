import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "./useAuthContext";
import axiosClient from "../http/axios";
import { url } from "../global/variables";

export const useLogin = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();

  const { dispatch } = useAuthContext();
  const abortController = useRef(new AbortController());

  const effectRan = useRef(false);

  const login = async (email, password) => {
    console.log("login ran");
    //React v18+ strict mode calls useEffect twice
    if (effectRan.current === false) return;

    setIsLoading(true);
    setError(null);

    await new Promise((resolve) => setTimeout(resolve, 1000));
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
          signal: abortController.current.signal,
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
    abortController.current = new AbortController();

    console.log("Component mounted so effect ran is", effectRan.current);
    effectRan.current = true;

    return () => {
      abortController.current.abort();
    };
  }, []);

  return { login, error, isLoading };
};
