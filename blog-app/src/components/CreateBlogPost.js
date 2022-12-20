import React, { useState } from "react";
import { useCreatePost } from "../hooks/useCreatePost";
import "./BlogPost.css";
export function CreateBlogPost() {
  const { submitPost, error } = useCreatePost();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitPost({ title, text });
  };

  return (
    <div class="container">
      <form onSubmit={handleSubmit}>
        <div class="form-row">
          <label for="exampleFormControlInput1">Title</label>
          <input
            type="text"
            class="form-control form-control-lg"
            id="exampleFormControlInput1"
            placeholder="Post title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
        </div>

        <div class="form-row">
          <label for="exampleFormControlTextarea1">Post Text</label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="10"
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
          ></textarea>
        </div>
        <button class="btn btn-primary" type="submit">
          Submit post
        </button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
}
