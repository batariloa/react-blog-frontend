import React, { useMemo } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { BlogPost } from "./BlogPost";
import "./css/BlogPost.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchBlog } from "../util/fetchBlogs";
import { BanButon } from "./BanButton";

export function Blog() {
  const [data, setData] = useState(null);

  //get user from context
  const { user } = useAuthContext();

  //get user from params (when viewing another user's blog)
  let { username } = useParams("");

  //if user views own blog, show username from Auth context
  if (!username) username = null;

  const navigate = useNavigate();

  //check for error while fetching
  useMemo(() => {
    fetchBlog(user, username, setData, navigate);
  }, [user, username, navigate]);

  return (
    <div className="blog-container">
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
