import React, { useState } from "react";
import { useCreatePost } from "../hooks/useCreatePost";
import { useNavigate } from "react-router-dom";
import { createAndEditPostJsx } from "../jsx/createAndEditPost";
import "./BlogPost.css";
import "./CreateBlogPost.css";
export function CreateBlogPost() {
  const { submitPost, error } = useCreatePost();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitPost({ title, text });

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
