import React from "react";

import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { BlogPost } from "./BlogPost";
import "./BlogPost.css";
export function Blog() {
  const { user } = useAuthContext();
  const [data, setData] = useState(null);

  useEffect(() => {
    const callApi = async () => {
      const response = await fetch("http://localhost:5153/post/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + user.token,
        },
      });

      const data = await response.json();

      if (response.ok) setData(data);

      console.log("data", data);
    };
    if (user) callApi();
  }, [user]);

  return (
    <div className="container">
      <div class="row row-cols-1 row-cols-md-3 g-4">
        {data && data.map((u) => <BlogPost post={u}></BlogPost>)}
      </div>
    </div>
  );
}
