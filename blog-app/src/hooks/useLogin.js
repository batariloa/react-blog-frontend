import { useState, useEffect, useRef } from "react";
import axiosClient from "../http/axios";
import { url } from "../global/variables";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const controller = useRef(new AbortController());

  useEffect(() => {
    return () => {
      controller.current.abort();
    };
  }, []);

  async function handleLogin(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    const localController = new AbortController();
    await new Promise(resolve => setTimeout(resolve, 5000));

    try {
      const loginRequest = await axiosClient.post(url + "/auth/login", {
        // Your login data
      }, {
        signal: localController.signal,
      });
    
      // Handle successful login
      setIsLoading(false);
      setError(null);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Aborted");
        // Handle aborted request
      } else {
        console.log("Error:", error);
        // Handle failed login
        setIsLoading(false);
        setError(error.message);
      }
    }
  }

  return [handleLogin, isLoading, error];
}
