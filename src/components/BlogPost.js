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
        setPostContent(text);

        // Extracting the title
        const titleMatch = text.match(/^#\s(.+)$/m);
        if (titleMatch && titleMatch[1]) {
          setTitle(titleMatch[1]);
        }

        // Extracting the description
        const descriptionMatch =
          text.match(/^##\s(.+)$/m) || text.match(/^\w[\s\S]{0,160}\./);
        if (descriptionMatch && descriptionMatch[0]) {
          setDescription(descriptionMatch[0]);
        }

        // Extracting the image URL
        const imageMatch = text.match(/!\[Sample Image\]\((.+?)\)/);
        if (imageMatch && imageMatch[1]) {
          setImageURL(window.location.origin + imageMatch[1]);
        }
      })
      .catch((error) => console.error(error));
  }, [postId]);

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageURL} />
      </Helmet>
      <div className="blog-post-detail">
        <ReactMarkdown className="markdown">{postContent}</ReactMarkdown>
      </div>
    </div>
  );
}

export default BlogPost;
