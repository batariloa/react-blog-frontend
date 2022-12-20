import React from "react";
import "./BlogPost.css";
export function BlogPost({ post }) {
  return (
    <div class="col">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">{post.title}</h5>
          <p class="card-text">{post.text}</p>
        </div>
      </div>
    </div>
  );
}
