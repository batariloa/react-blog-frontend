import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useEditPost = () => {
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const editPost = async (id, title, text) => {
    setError(null);
    console.log("USER TOKEn", user.token);

    const response = await fetch("http://localhost:5153/post/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        Authorization: "Bearer " + user.token,
      },
      body: JSON.stringify({
        Title: title,
        Text: text,
      }),
    });

    const json = await response.json();

    console.log("json " + JSON.stringify(json));

    if (json.status !== 200) {
      setError(json.title);
    }
  };

  return { editPost, error };
};
