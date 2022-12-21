import React from "react";

import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { BlogPost } from "./BlogPost";
import "./BlogPost.css";
import { useParams } from "react-router-dom";
export function Blog() {
  const { username } = useParams("");

  const { user } = useAuthContext();
  const [data, setData] = useState(null);

  useEffect(() => {
    let url = "http://localhost:5153/post/";
    if (username) url = "http://localhost:5153/post/" + username;

    console.log("URL IS ", url);

    const callApi = async () => {
      const response = await fetch(url, {
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
      <div class="row row-cols-1 row-cols-md-3 g-2">
        {data &&
          data.map((u) => (
            <BlogPost post={u} data={data} setData={setData}></BlogPost>
          ))}
      </div>
    </div>
  );
}
