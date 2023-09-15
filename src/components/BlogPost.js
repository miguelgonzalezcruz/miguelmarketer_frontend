import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Helmet } from "react-helmet";
import "../blocks/BlogPost.css";

function BlogPost() {
  const [postContent, setPostContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const { postId } = useParams();

  useEffect(() => {
    fetch(`/posts/${postId}.md`)
      .then((response) => response.text())
      .then((text) => {
        // Extract and set the title, description, and image URL from the markdown content
        const titleMatch = text.match(/^#\s(.+)$/m);
        if (titleMatch && titleMatch[1]) {
          setTitle(titleMatch[1]);

          // Remove the first occurrence of the title in the markdown content
          text = text.replace(titleMatch[0], "");
        }

        const descriptionMatch =
          text.match(/^##\s(.+)$/m) || text.match(/^\w[\s\S]{0,160}\./);
        if (descriptionMatch && descriptionMatch[0]) {
          setDescription(descriptionMatch[0]);
        }

        const imageMatch = text.match(/!\[.*?\]\((.+?)\)/);
        if (imageMatch && imageMatch[1]) {
          let imgSrc = imageMatch[1];
          setImageURL(
            imgSrc.startsWith("http") ? imgSrc : window.location.origin + imgSrc
          );

          // Remove the first occurrence of the image in the markdown content
          text = text.replace(imageMatch[0], "");
        }

        // Set the post content state with the updated text (without the first image)
        setPostContent(text);
      })
      .catch((error) => console.error(error));
  }, [postId]);

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Open Graph / Facebook / LinkedIn */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageURL} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:site_name" content="Your Site Name" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={window.location.href} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={imageURL} />
      </Helmet>
      <div className="blog-post-detail">
        <div className="header-container">
          <img src={imageURL} alt="Header Image" />
          <h1>{title}</h1>
        </div>
        <div className="content">
          <ReactMarkdown className="markdown">{postContent}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
