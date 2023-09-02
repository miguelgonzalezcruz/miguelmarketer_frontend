import React from "react";
import { Link } from "react-router-dom";
import posts from "../utils/data.json";
import "../blocks/BlogList.css";

const BlogList = () => {
  return (
    <div className="blog-list-container">
      {posts.map((post) => (
        <div
          key={post.id}
          className="blog-post-excerpt"
          style={{ backgroundImage: `url(${post.imagePath})` }}
        >
          <div className="blog-post-content">
            <h2>{post.title}</h2>
            <Link to={`/blog/${post.id}`} className="read-more-btn">
              Leer post
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
