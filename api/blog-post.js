// /api/blog-post.js
import { createClient } from "contentful";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Only GET requests are allowed" });
  }

  const { slug } = req.query; // Extraemos el slug desde los parámetros de la URL

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  try {
    const response = await client.getEntries({
      content_type: "blogPost", // Cambia esto según tu content type en Contentful
      "fields.slug": slug,
      limit: 1,
    });

    if (response.items.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Extraemos los assets (imágenes) y el post
    const assets = {};
    if (response.includes && response.includes.Asset) {
      response.includes.Asset.forEach((asset) => {
        assets[asset.sys.id] = asset.fields.file.url;
      });
    }

    const item = response.items[0];
    const post = {
      id: item.sys.id,
      title: item.fields.title,
      description: item.fields.description,
      content: item.fields.content,
      heroImageUrl: item.fields.heroimage
        ? assets[item.fields.heroimage.sys.id]
        : null,
      author: item.fields.author,
      slug: item.fields.slug,
      date: item.fields.date,
    };

    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post from Contentful:", error);
    res.status(500).json({ message: "Error fetching post" });
  }
}
