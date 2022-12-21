import React from "react";
import "./BlogPost.css";
import { useDeletePost } from "../hooks/useDeletPost";
import { useRepost } from "../hooks/useRepost";
import { useAuthContext } from "../hooks/useAuthContext";
export function BlogPost({ post, data, setData }) {
  const { user } = useAuthContext();

  const { deletePost, errorDelete } = useDeletePost();

  const { repost, errorRepost } = useRepost();

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

  return (
    <div class="col-sm">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">{post.title}</h5>
          <p class="card-text">{post.text}</p>
        </div>

        {/* If this is the users post, show delete and edit */}
        {post.ownerId === user.id && (
          <div className="row mx-auto mb-2">
            <div class="col-md-4">
              <button
                class="btn btn-danger"
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
                class=" btn btn-success"
                onClick={() => {
                  handleDeletePost(post.id);
                }}
              >
                <i class="bi-pen-fill" style={{ fontSize: 25 }}></i>
              </button>
            </div>

            {errorDelete && <p>{errorDelete}</p>}
            <div class="col-md-4">
              <button class="col-sm btn btn-primary" onClick={handlePostRepost}>
                <i class="bi-arrow-repeat" style={{ fontSize: 25 }}></i>
              </button>
            </div>
          </div>
        )}

        {post.ownerId !== user.id && (
          <div className="row text-center">
            <div class="col-md-4">
              <button class="col-sm btn btn-primary" onClick={handlePostRepost}>
                <i class="bi-arrow-repeat" style={{ fontSize: 25 }}></i>
              </button>
            </div>
          </div>
        )}

        {post.repost && (
          <div>
            Reposted from{" "}
            <a href={"/blog/" + post.authorUsername}>{post.authorUsername}</a>
          </div>
        )}
      </div>
    </div>
  );
}
