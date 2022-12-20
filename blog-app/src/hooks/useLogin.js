import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);

  const { dispatch } = useAuthContext();

  const login = async (Email, Password) => {
    setError(null);

    const response = await fetch("http://localhost:5153/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Email,
        Password,
      }),
    });

    const json = await response.json();

    console.log(" is it ok", response.ok);

    console.log("response");

    if (!response.ok) {
      setError(json.title);
    }

    if (response.ok) {
      //save user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      //update the auth context
      dispatch({ type: "LOGIN", payload: json });

      console.log("stringify", JSON.stringify(json));
    }
  };

  return { login, error };
};
