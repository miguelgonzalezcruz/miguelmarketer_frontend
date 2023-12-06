import Helmet from "react-helmet";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import "../blocks/BlogPost.css";

function BlogPost() {
  const [postContent, setPostContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [isContentLoaded, setIsContentLoaded] = useState(false);
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

        // Loading image to ensure it's loaded
        // Make sure imageURL is set before loading the image
        if (imageURL) {
          const img = new Image();
          img.onload = () => setIsContentLoaded(true);
          img.onerror = () => setIsContentLoaded(true); // Consider load complete even if the image fails to load
          img.src = imageURL;
        } else {
          // If there is no image URL, consider the content loaded
          setIsContentLoaded(true);
        }
      })
      .catch((error) => console.error(error));
  }, [postId, imageURL]);

  useEffect(() => {
    if (isContentLoaded) {
      window.prerenderReady = true;
    }
  }, [isContentLoaded]);

  return (
    <div>
      <div className="blog-post-detail">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={imageURL} />
          <meta property="og:url" content={window.location.href} />
          <meta property="og:type" content="article" />
          {/* Other relevant OG tags */}
        </Helmet>
        <div className="header-container">
          <img src={imageURL} alt={title} />
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
