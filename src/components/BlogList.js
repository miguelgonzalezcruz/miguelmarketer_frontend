import React from "react";
import { Link } from "react-router-dom";
import posts from "../utils/data.json";
import "../blocks/BlogList.css";

const BlogList = () => {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="blog-post-excerpt">
          <h2>
            <Link to={`/blog/${post.id}`}>{post.title}</Link>
          </h2>
          <p>{post.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
