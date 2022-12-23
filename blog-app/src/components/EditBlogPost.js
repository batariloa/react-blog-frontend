import React, { useState } from "react";
import { useEditPost } from "../hooks/useEditPost";
import { useNavigate } from "react-router-dom";
import { createAndEditPostJsx } from "../jsx/createAndEditPost";
import { useLocation } from "react-router-dom";
import "./BlogPost.css";
import "./CreateBlogPost.css";
export function EditBlogPost() {
  const { editPost, error } = useEditPost();

  const { state } = useLocation();
  const navigate = useNavigate();

  const postId = state.post.id;
  const [title, setTitle] = useState(state.post.title);
  const [text, setText] = useState(state.post.text);
  console.log("TITLE", title);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editPost(postId, title, text);

    if (!error) navigate("/blog");
  };

  return createAndEditPostJsx(
    handleSubmit,
    title,
    setTitle,
    text,
    setText,
    error
  );
}
