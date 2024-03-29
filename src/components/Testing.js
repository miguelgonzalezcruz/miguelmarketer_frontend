// BlogPostDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../blocks/BlogPost.css";

const BlogPostDetail = () => {
  const { slug } = useParams();
  console.log("Slug:", slug);

  const baseURL =
    process.env.NODE_ENV === "production"
      ? "https://api.miguelmarketer.com"
      : "http://localhost:3001";

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${baseURL}/api/blog-posts/${slug}`);
        const data = await response.json();

        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="blog-post-detail">
      <div className="header-container">
        <h1>{post.title}</h1>

        {post.heroImageUrl && <img src={post.heroImageUrl} alt={post.title} />}
      </div>
      <p>{post.description}</p>
      <div className="blog-post-detail">
        <p>{post.content}</p>
      </div>

      <p>By: {post.author}</p>
      <p>Date: {post.date}</p>
    </div>
  );
};

export default BlogPostDetail;
