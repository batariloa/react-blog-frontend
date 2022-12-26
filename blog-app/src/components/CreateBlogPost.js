import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePost } from "../hooks/useCreatePost";
import { createAndEditPostJsx } from "./jsx/createAndEditPost";
import "./css/BlogPost.css";
import "./css/CreateBlogPost.css";
export function CreateBlogPost() {
  const { submitPost, error, isLoading } = useCreatePost();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const header = "New post";
  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitPost({ title, text });
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
    error,
    header
  );
}
