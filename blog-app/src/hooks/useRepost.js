import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useRepost = () => {
  const { user } = useAuthContext();

  const [error, setError] = useState(null);

  const repost = async (id) => {
    const response = fetch("http://localhost:5153/post/repost/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + user.token,
      },
    });

    const json = await response.json();

    if (response.ok) {
      console.log("Reposted", json);
    }

    if (!response.ok) {
      setError(response.title);
    }
  };

  return { repost, error };
};
