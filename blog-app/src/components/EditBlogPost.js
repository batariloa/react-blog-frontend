import { useState, useEffect } from "react";
import { useEditPost } from "../hooks/useEditPost";
import { useNavigate } from "react-router-dom";
import { createAndEditPostJsx } from "../jsx/createAndEditPost";
import { useLocation } from "react-router-dom";
import "./BlogPost.css";
import "./CreateBlogPost.css";

export function EditBlogPost() {
  const { editPost, error, isLoading } = useEditPost();

  const { state } = useLocation();
  const navigate = useNavigate();

  const postId = state.post.id;
  const [title, setTitle] = useState(state.post.title);
  const [text, setText] = useState(state.post.text);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editPost(postId, title, text);
  };

  useEffect(() => {
    if (error === null && !isLoading) navigate("/blog");
  }, [error, isLoading, navigate]);

  return createAndEditPostJsx(
    handleSubmit,
    title,
    setTitle,
    text,
    setText,
    error
  );
}
