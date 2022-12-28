import React from "react";

import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { BlogPost } from "./BlogPost";
import "./css/BlogPost.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { showBan } from "../util/showBan";
import { useSuspendUser } from "../hooks/useSuspendUser";

export function Blog() {
  const { user } = useAuthContext();
  let { username } = useParams("");

  if (!username) username = user.username;

  const navigate = useNavigate();

  const { suspend, error, isLoading } = useSuspendUser();

  const showBanVal = showBan(user, username);

  const [data, setData] = useState(null);

  const handleBanUser = async () => {
    await suspend(username);
  };

  useEffect(() => {
    if (!isLoading && error === null) navigate("/blog");
  }, [error, isLoading, navigate]);

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
        if (response.status === 404) navigate("/404");
      }
    };
    if (user) callApi();
    else navigate("/login");
  }, [user, username, navigate]);

  return (
    <div className="blog-container">
      {showBanVal && (
        <div className="card bg-dark text-white d-inline-block  ">
          <div
            className="row   mx-auto d-flex my-auto"
            style={{ alignItems: "center" }}
          >
            {" "}
            <p className="col-lg pt-3">User {username}'s blog</p>
            <button
              onClick={handleBanUser}
              style={{ width: "300px" }}
              className="col-lg btn btn-danger mx-auto "
            >
              Ban
            </button>
          </div>
        </div>
      )}

      {!showBanVal && (
        <h2 className="text-white mt-5">User {username}'s blog</h2>
      )}

      {data && data.length === 0 && (
        <div style={{ marginTop: "200px" }}>
          <h5 className="text-white mt-2 text-center">
            User does not have any posts.
          </h5>
        </div>
      )}

      <div class="row row-cols-md-3 g-2 ">
        {data &&
          data.map((u) => (
            <BlogPost post={u} data={data} setData={setData}></BlogPost>
          ))}
      </div>
    </div>
  );
}
