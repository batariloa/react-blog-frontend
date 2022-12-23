import React from "react";
import "./BlogPost.css";
import { useDeletePost } from "../hooks/useDeletPost";
import { useRepost } from "../hooks/useRepost";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
export function BlogPost({ post, data, setData }) {
  const { user } = useAuthContext();

  const { deletePost, errorDelete } = useDeletePost();

  const { repost, errorRepost } = useRepost();

  const navigate = useNavigate();

  console.log("length ", post.text.length);

  const displayTitle = post.title.slice(0, 40);

  let displayText = post.text.slice(0, 150);

  if (displayText.length >= 50) displayText += "...";

  const handleDeletePost = async () => {
    if (window.confirm("Delete post?")) {
      setData(data.filter((item) => item.id !== post.id));
      await deletePost(post.id);
    }
  };

  const handlePostRepost = async () => {
    if (window.confirm("Repost?")) {
      await repost(post.id);
    }
  };

  const handleEditPost = async () => {
    navigate("/edit", { state: { post } });
  };

  return (
    <div class="col-md">
      <div class="post bg-dark  card h-100 text-white  ">
        <div class="card-body ">
          <h5 class="card-title">{displayTitle}</h5>
          <hr></hr>
          <p class="card-text">{displayText}</p>
        </div>
        {post.repost && (
          <div>
            Reposted from{" "}
            <a href={"/blog/" + post.authorUsername}>{post.authorUsername}</a>
          </div>
        )}
        <hr></hr>

        {/* If this is the users post, show delete and edit */}
        {post.ownerId === user.id && (
          <div className="row mx-auto mb-2 ">
            <div class="col-md-4">
              <button
                class="btn btn-outline-danger"
                onClick={() => {
                  handleDeletePost(post.id);
                }}
              >
                <i class="col bi-trash-fill" style={{ fontSize: 25 }}></i>
              </button>
            </div>

            {errorDelete && <p>{errorDelete}</p>}
            <div class="col-md-4">
              <button
                type="button"
                class=" btn btn-outline-success"
                onClick={handleEditPost}
              >
                <i class="bi-pen-fill" style={{ fontSize: 25 }}></i>
              </button>
            </div>

            {errorDelete && <p>{errorDelete}</p>}
            <div class="col-md-4">
              <button
                class="col-sm btn btn-outline-primary"
                onClick={handlePostRepost}
              >
                <i class="bi-arrow-repeat" style={{ fontSize: 25 }}></i>
              </button>
            </div>
          </div>
        )}

        {post.ownerId !== user.id && (
          <div className="row mx-auto mb-2 text-center">
            <div class="col">
              <button class="col-sm btn btn-primary" onClick={handlePostRepost}>
                <i class="bi-arrow-repeat" style={{ fontSize: 25 }}></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
