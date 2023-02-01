import React, { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { BlogPost } from "./BlogPost";
import "./css/BlogPost.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFetchBlog } from "../hooks/useFetchBlogs";
import { BanButon } from "./BanButton";
import { nanoid } from "nanoid";

export function Blog() {
  const [data, setData] = useState();
  const [processedData, setProcessedData] = useState();

  //get user from context
  const { user } = useAuthContext();

  //get user from params (when viewing another user's blog)
  let { username } = useParams("");

  //if user views own blog, show username from Auth context
  if (!username) username = null;

  const navigate = useNavigate();

  useFetchBlog(user, username, setData, navigate);

  useEffect(() => {
    if (!data) return;
    if (!data.posts) return;
    const blogPostsWithId = data.posts.map((post) => ({
      ...post,
      uniqueId: nanoid(),
    }));

    setProcessedData(blogPostsWithId);
  }, [data]);

  //check for error while fetching

  return (
    <div className="blog-container">
      {data && data.length === 0 && (
        <div style={{ marginTop: "200px" }}>
          <h5>User does not have any posts.</h5>
        </div>
      )}

      <div className="row row-cols-md-3 g-2 ">
        {processedData &&
          processedData.map((u) => (
            <BlogPost
              key={u.uniqueId}
              post={u}
              data={processedData}
              setData={setData}
            ></BlogPost>
          ))}
      </div>
    </div>
  );
}
