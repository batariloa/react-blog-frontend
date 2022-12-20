import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useCreatePost = () => {
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const submitPost = async (post) => {
    setError(null);
    console.log("USER TOKEn", user.token);

    console.log("Post ", post);

    const response = await fetch("http://localhost:5153/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        Authorization: "Bearer " + user.token,
      },
      body: JSON.stringify({
        Title: post.title,
        Text: post.text,
      }),
    });

    const json = await response.json();

    console.log("json " + JSON.stringify(json));

    if (json.status != 200) {
      setError(json.title);
    }
  };

  return { submitPost, error };
};
