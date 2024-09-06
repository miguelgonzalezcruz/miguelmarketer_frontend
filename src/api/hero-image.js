// src/api/hero-image.js

export default async function handler(req, res) {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  const collections = "Wallpapers";
  const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&collections=${collections}&orientation=landscape&content_filter=high`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.status !== 200) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const imageUrl = data.urls.full;
    const imageAuthor = data.user.name;
    const imageAuthorUrl = data.user.links.html;
    const imageAuthorProfileImage = data.user.profile_image.medium;

    // Devuelve la imagen y detalles del autor
    res.status(200).json({
      imageUrl,
      imageAuthor,
      imageAuthorUrl,
      imageAuthorProfileImage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching hero image" });
  }
}
