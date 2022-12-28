import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDeletePost } from "../hooks/useDeletePost";
import { useRepost } from "../hooks/useRepost";
import { showEdit, showDelete } from "../util/showEditDelete";
import "./css/BlogPost.css";
export function BlogPost({ post, data, setData }) {
  const { user } = useAuthContext();

  const { deletePost, error: errorDelete } = useDeletePost();

  const { repost, error: erroRepost, isLoading: repostIsLoading } = useRepost();

  const navigate = useNavigate();

  const displayTitle = post.title.slice(0, 40);

  let displayText = post.text.slice(0, 150);

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

  useEffect(() => {
    if (erroRepost !== null) alert("An error occured.");
  }, [erroRepost, repostIsLoading]);

  return (
    <div class="col-md">
      <div class="post bg-dark  card h-100 text-white  ">
        <div class="card-body ">
          <h5 class="card-title">{displayTitle}</h5>
          <hr></hr>
          <p class="card-text">
            {displayText}{" "}
            {displayText.length >= 50 ? (
              <Link to={"/post"} state={{ post }}>
                {" "}
                ...view more
              </Link>
            ) : (
              ""
            )}{" "}
          </p>
        </div>
        {post.repost && (
          <div>
            Reposted from{" "}
            <a href={"/blog/" + post.authorUsername}>{post.authorUsername}</a>
          </div>
        )}
        <hr></hr>

        {/* If this is the users post, show delete and edit */}

        <div className="row mx-auto mb-2  justify-content-center ">
          {showDelete(post, user) && (
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
          )}

          {errorDelete && <p>{errorDelete}</p>}

          {showEdit(post, user) && (
            <div class="col-md-4">
              <button
                type="button"
                class=" btn btn-outline-success"
                onClick={handleEditPost}
              >
                <i class="bi-pen-fill" style={{ fontSize: 25 }}></i>
              </button>
            </div>
          )}

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
      </div>
    </div>
  );
}
