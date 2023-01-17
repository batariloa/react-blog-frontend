import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDeletePost } from "../hooks/useDeletePost";
import { useRepost } from "../hooks/useRepost";
import "./css/DetailedBlogPost.css";

export function DetailedBlogPost() {
  const { state } = useLocation();
  const { user } = useAuthContext();
  const { post } = state;

  const {
    deletePost,
    error: errorDelete,
    isLoading: deleteLoading,
  } = useDeletePost();

  const {
    repost,
    error: errorRepost,
    isLoading: repostIsLoading,
  } = useRepost();

  const navigate = useNavigate();

  const handleDeletePost = async () => {
    if (window.confirm("Delete?")) {
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

  useEffect(() => {
    if (errorDelete === null && !deleteLoading) navigate("/blog");
  }, [errorDelete, deleteLoading, navigate]);

  useEffect(() => {
    if (errorRepost === null && !repostIsLoading) navigate("/blog");
  }, [errorRepost, repostIsLoading, navigate]);

  // eslint-disable-next-line no-unused-vars
  const [title, setTitle] = useState(state.post.title);
  // eslint-disable-next-line no-unused-vars
  const [text, setText] = useState(state.post.text);

  return (
    <div className=" card  mx-auto bg-dark text-white" id="post">
      <div class="card-body ">
        <h5 class="card-title">{title}</h5>
        <hr></hr>
        <p class="card-text">{text}</p>
      </div>
      {post.ownerId === user.id && (
        <div className="row  mb-2 mx-auto center-block text-center ">
          <div class="col ">
            <button
              class="btn btn-outline-danger"
              onClick={() => {
                handleDeletePost(post.id);
              }}
            >
              <i class="bi-trash-fill" style={{ fontSize: 25 }}></i>
            </button>

            {errorDelete && <p>{errorDelete}</p>}

            <button
              type="button"
              class=" btn btn-outline-success m-2"
              onClick={handleEditPost}
            >
              <i class="bi-pen-fill" style={{ fontSize: 25 }}></i>
            </button>

            {errorDelete && <p>{errorDelete}</p>}

            <button
              class="col-sm btn btn-outline-primary"
              onClick={handlePostRepost}
            >
              <i class="bi-arrow-repeat" style={{ fontSize: 25 }}></i>
            </button>
          </div>
        </div>
      )}{" "}
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
  );
}
