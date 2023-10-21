import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <div>
          {posts.map((post, index) => (
            <div key={index}>
              <h2>
                <Link to={`/blog-posts/${post.slug}`}>{post.title}</Link>
              </h2>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              {post.heroImageUrl && (
                <img src={post.heroImageUrl} alt={post.title} />
              )}
              <div>{post.content}</div>
              <p>By: {post.author}</p>
              <p>Date: {post.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewBlogPosts;

{
  /* <div>
{loading && <p>Loading...</p>}
{error && <p>Error: {error}</p>}
{!loading && !error && (
  <div>
    {posts.map((post, index) => (
      <div key={index}>
        <h2>{post.title}</h2>
        <p>{post.description}</p>
        {post.heroImageUrl && (
          <img src={post.heroImageUrl} alt={post.title} />
        )}
        <div>{post.content}</div>
        <p>By: {post.author}</p>
        <p>Date: {post.date}</p>
      </div>
    ))}
  </div>
)}
</div> */
}
