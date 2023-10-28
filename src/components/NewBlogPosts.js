import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../blocks/BlogList.css";

const NewBlogPosts = () => {
  const baseURL =
    process.env.NODE_ENV === "production"
      ? "https://api.miguelmarketer.com"
      : "http://localhost:3001";

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${baseURL}/api/blog-posts`);
        const data = await response.json();

        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array ensures the fetch runs once when component mounts

  return (
    <div>
      <h1 className="blog-title">Blog</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <div className="blog-list-container">
          <div className="blog-list-list">
            {posts.map((post, index) => (
              <div
                key={post.id}
                className="blog-post-excerpt"
                style={{ backgroundImage: `url(${post.heroImageUrl})` }}
              >
                <div className="blog-post-excerpt" key={index}>
                  <div className="blog-post-content">
                    <h2>{post.title}</h2>
                    <h2>
                      <Link
                        to={`/blog-posts/${post.slug}`}
                        className="read-more-btn"
                      >
                        Leer post
                      </Link>
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewBlogPosts;
