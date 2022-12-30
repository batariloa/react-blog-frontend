import React, { useMemo } from "react";

import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { BlogPost } from "./BlogPost";
import "./css/BlogPost.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { showBan } from "../util/showBan";
import { useSuspendUser } from "../hooks/useSuspendUser";
import { fetchBlog } from "../util/fetchBlogs";

export function Blog() {
  const [data, setData] = useState(null);

  //get user from context
  const { user } = useAuthContext();

  //get user from params (when viewing another user's blog)
  let { username } = useParams("");

  //if user views own blog, show username from Auth context
  if (!username) username = user.username;

  const navigate = useNavigate();

  const { suspend, error, isLoading } = useSuspendUser();

  //load value once
  const showBanVal = showBan(user, username);

  //click 'Ban' button
  const handleBanUser = async () => {
    await suspend(username);
  };

  //check for error while suspendng user
  useEffect(() => {
    if (!isLoading && error === null) navigate("/blog");
  }, [error, isLoading, navigate]);

  //check for error while fetching
  useMemo(() => {
    fetchBlog(user, username, setData, navigate);
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
          <h5>User does not have any posts.</h5>
        </div>
      )}

      <div className="row row-cols-md-3 g-2 ">
        {data &&
          data.map((u) => (
            <BlogPost
              key={u.id}
              post={u}
              data={data}
              setData={setData}
            ></BlogPost>
          ))}
      </div>
    </div>
  );
}
