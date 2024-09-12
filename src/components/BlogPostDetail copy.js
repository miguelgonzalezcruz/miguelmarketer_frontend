//src/components/BlogPostDetail.js

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
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      console.log("Fetching post data...");
      try {
        const response = await fetch(`${baseURL}/api/blog-posts/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post.");
        }
        const data = await response.json();
        console.log("Post data fetched successfully:", data);
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, baseURL]);

  useEffect(() => {
    if (post?.heroImageUrl) {
      console.log("Loading image:", post.heroImageUrl);
      const image = new Image();
      image.onload = () => {
        console.log("Image loaded successfully.");
        setIsImageLoaded(true);
      };
      image.onerror = () => {
        console.error("Image load error.");
        setIsImageLoaded(true);
      };
      image.src = post.heroImageUrl;
    } else {
      console.log("No image URL to load.");
      setIsImageLoaded(true);
    }
  }, [post]);

  useEffect(() => {
    if (!loading && isImageLoaded && post) {
      console.log("Setting window.prerenderReady to true");
      window.prerenderReady = true;
    }
  }, [loading, isImageLoaded, post]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!post) return null; // Adding a safety check in case post is null

  // Destructuring after the loading and error checks
  const { title, heroImageUrl, description, richContent, author, date } = post;

  return (
    <div className="blog-post-detail">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="title" property="og:title" content={title} />
        <meta
          name="description"
          property="og:description"
          content={description}
        />
        <meta name="image" property="og:image" content={heroImageUrl} />
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
