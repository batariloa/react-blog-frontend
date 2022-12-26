import React from "react";

import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { BlogPost } from "./BlogPost";
import "./css/BlogPost.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function Blog() {
  const { username } = useParams("");

  const navigate = useNavigate();

  const { user } = useAuthContext();
  const [data, setData] = useState(null);

  useEffect(() => {
    let url = "http://localhost:5153/post/";
    if (username) url = "http://localhost:5153/post/" + username;

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

      if (!response.ok) {
        if (response.status === 401) navigate("/login");
      }
    };
    if (user) callApi();
    else navigate("/login");
  }, [user, username, navigate]);

  return (
    <div className="blog-container">
      <div class="row row-cols-md-3 g-2 ">
        {data &&
          data.map((u) => (
            <BlogPost post={u} data={data} setData={setData}></BlogPost>
          ))}
      </div>
    </div>
  );
}
