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
  const [isContentLoaded, setIsContentLoaded] = useState(true);
  const { postId } = useParams();

  useEffect(() => {
    fetch(`/posts/${postId}.md`)
      .then((response) => response.text())
      .then((text) => {
        // Extract title
        const titleMatch = text.match(/^#\s(.+)$/m);
        if (titleMatch && titleMatch[1]) {
          setTitle(titleMatch[1]);
          text = text.replace(titleMatch[0], "");
        }

        // Extract description
        const descriptionMatch =
          text.match(/^##\s(.+)$/m) || text.match(/^\w[\s\S]{0,160}\./);
        if (descriptionMatch && descriptionMatch[0]) {
          setDescription(descriptionMatch[0]);
        }

        // Extract image URL and set it
        const imageMatch = text.match(/!\[.*?\]\((.+?)\)/);
        if (imageMatch && imageMatch[1]) {
          let imgSrc = imageMatch[1].startsWith("http")
            ? imageMatch[1]
            : window.location.origin + imageMatch[1];
          setImageURL(imgSrc);
          text = text.replace(imageMatch[0], "");
        }

        setPostContent(text);
      })
      .catch((error) => console.error(error));
  }, [postId]);

  useEffect(() => {
    if (imageURL) {
      const img = new Image();
      img.onload = () => setIsContentLoaded(true);
      img.onerror = () => setIsContentLoaded(true); // Consider load complete even if the image fails to load
      img.src = imageURL;
    } else {
      // If there is no image URL, consider the content loaded
      setIsContentLoaded(true);
    }
  }, [imageURL]);

  useEffect(() => {
    if (isContentLoaded) {
      console.log("Setting prerenderReady to true");
      window.prerenderReady = true;
    }
  }, [isContentLoaded]);

  return (
    <div>
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
          <meta name="image" property="og:image" content={imageURL} />
          <meta name="url" property="og:url" content={window.location.href} />
          <meta name="type" property="og:type" content="article" />
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
