import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
  const [error, setError] = useState(null);

  const { dispatch } = useAuthContext();

  const register = async (Firstname, Lastname, Email, Password) => {
    setError(null);

    const response = await fetch("http://localhost:5153/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Firstname,
        Lastname,
        Email,
        Password,
        ConfirmPassword: Password,
      }),
    });

    const json = await response.json();

    console.log(" is it ok", response.ok);

    if (!response.ok) {
      console.log("JSON ERROR", json);
      setError(json.title);
    }

    if (response.ok) {
      // save user to localstorage
      localStorage.setItem("user", JSON.stringify(json));

      console.log(json);
      //update auth context
      dispatch({ type: "LOGIN", payload: json });
    }
  };

  return { register, error };
};
