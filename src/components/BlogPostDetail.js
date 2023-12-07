import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Helmet } from "react-helmet";
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

  return (
    <div className="blog-post-detail">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {/* Add Open Graph (OG) tags for social media previews */}
        <meta name="title" property="og:title" content={title} />
        <meta
          name="description"
          property="og:description"
          content={description}
        />
        <meta name="image" property="og:image" content={heroImageUrl} />
        {/* Add Twitter Card tags if needed */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={heroImageUrl} />
      </Helmet>
      <div className="header-container">
        <h1>{title}</h1>
        {heroImageUrl && <img src={heroImageUrl} alt={title} />}
      </div>
      <div>{documentToReactComponents(richContent)}</div>
      <p>
        Por {author} ({date})
      </p>
    </div>
  );
};

export default BlogPostDetail;
