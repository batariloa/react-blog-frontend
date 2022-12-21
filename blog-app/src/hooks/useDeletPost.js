import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useDeletePost = () => {
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const deletePost = async (id) => {
    setError(null);
    console.log("USER TOKEn", user.token);

    const response = await fetch("http://localhost:5153/post/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        Authorization: "Bearer " + user.token,
      },
    });

    const json = await response.text();

    if (json.status !== 200) {
      setError(json.title);
    }
  };

  return { deletePost, error };
};
