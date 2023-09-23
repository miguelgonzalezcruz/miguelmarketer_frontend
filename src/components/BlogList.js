import React from "react";
import { Link } from "react-router-dom";
import posts from "../utils/data.json";
import "../blocks/BlogList.css";

const BlogList = () => {
  // Sort posts in descending order based on the "number" property
  const sortedPosts = [...posts].sort(
    (a, b) => parseInt(b.number, 10) - parseInt(a.number, 10)
  );

  return (
    <div>
      <h1 className="blog-title">Blog</h1>

      <div className="blog-list-container">
        {sortedPosts.map((post) => (
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
    </div>
  );
};

export default BlogList;
