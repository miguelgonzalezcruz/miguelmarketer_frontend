import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import "../blocks/BlogPost.css";

const BlogPostDetail = () => {
  const { slug } = useParams();

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
        if (!response.ok) {
          throw new Error("Failed to fetch post.");
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, baseURL]); // Add slug and baseURL as dependencies

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!post) return null; // Adding a safety check in case post is null

  const {
    title,
    heroImageUrl,
    description,
    content,
    richContent,
    author,
    date,
  } = post;

  console.log(content);

  return (
    <div className="blog-post-detail">
      <div className="header-container">
        <h1>{title}</h1>
        {heroImageUrl && <img src={heroImageUrl} alt={title} />}
      </div>
      <div>{documentToReactComponents(richContent)}</div>
      <p>
        By: {author} ({date})
      </p>
    </div>
  );
};

export default BlogPostDetail;
