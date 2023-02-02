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
  
  const displayTitle =()=>{

    if(post.title) return post.title.slice(0, 40);
    
    return ""
  } 

  const displayText= ()=>{

    if(post.text) return post.text.slice(0, 150);

    return ""
  }


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

  console.log("POSRT DATA", post)
  useEffect(() => {
    if (erroRepost !== null) alert("An error occured.");
  }, [erroRepost, repostIsLoading]);

  return (
    <div className="col-md">
      <div className="post bg-dark  card h-100 text-white  ">
        <div className="card-body ">
          <h5 className="card-title">{displayTitle()}</h5>
          <hr></hr>
          <p className="card-text">
            {displayText()}{" "}
            {displayText().length >= 50 ? (
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
            <div className="col-md-4">
              <button
                className="btn btn-outline-danger"
                onClick={() => {
                  handleDeletePost(post.id);
                }}
              >
                <i className="col bi-trash-fill" style={{ fontSize: 25 }}></i>
              </button>
            </div>
          )}

          {errorDelete && <p>{errorDelete}</p>}

          {showEdit(post, user) && (
            <div className="col-md-4">
              <button
                type="button"
                className=" btn btn-outline-success"
                onClick={handleEditPost}
              >
                <i className="bi-pen-fill" style={{ fontSize: 25 }}></i>
              </button>
            </div>
          )}

          {errorDelete && <p>{errorDelete}</p>}
          <div className="col-md-4">
            <button
              className="col-sm btn btn-outline-primary"
              onClick={handlePostRepost}
            >
              <i className="bi-arrow-repeat" style={{ fontSize: 25 }}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
