// /api/blog-posts.js
import { createClient } from "contentful";

export default async function handler(req, res) {
  // Chequeamos que el método sea GET
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Only GET requests are allowed" });
  }

  // Inicializa el cliente de Contentful usando las variables de entorno
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  try {
    // Consulta los posts desde Contentful
    const response = await client.getEntries({
      content_type: "BlogPost", // Cambia esto según tu content type en Contentful
    });

    // Extraemos los assets (imágenes) y los posts
    const assets = {};
    if (response.includes && response.includes.Asset) {
      response.includes.Asset.forEach((asset) => {
        assets[asset.sys.id] = asset.fields.file.url;
      });
    }

    const posts = response.items.map((item) => ({
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
    }));

    // Devolvemos los posts en formato JSON
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts from Contentful:", error);
    res.status(500).json({ message: "Error fetching posts" });
  }
}
