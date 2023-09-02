import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "../blocks/BlogPost.css";

function BlogPost() {
  const [postContent, setPostContent] = useState("");
  const { postId } = useParams();

  useEffect(() => {
    fetch(`/posts/${postId}.md`)
      .then((response) => response.text())
      .then((text) => setPostContent(text))
      .catch((error) => console.error(error));
  }, [postId]);

  return (
    <div>
      <div></div>
      <div className="blog-post-detail">
        <ReactMarkdown className="markdown">{postContent}</ReactMarkdown>
      </div>
    </div>
  );
}

export default BlogPost;
