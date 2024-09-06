// src/api/hero-image.js

export default async function handler(req, res) {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  const collections = "Wallpapers";
  const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&collections=${collections}&orientation=landscape&content_filter=high`;

  try {
    console.log(`Fetching Unsplash API from URL: ${apiUrl}`);

    const response = await fetch(apiUrl);
    console.log(`Response status: ${response.status}`);
    console.log(`Response headers: ${JSON.stringify(response.headers.raw())}`);

    // Verifica si la respuesta es JSON
    const contentType = response.headers.get("content-type");
    console.log(`Content type of response: ${contentType}`);

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      console.log("Fetched data from Unsplash API:", data);

      const imageUrl = data.urls.full;
      const imageAuthor = data.user.name;
      const imageAuthorUrl = data.user.links.html;
      const imageAuthorProfileImage = data.user.profile_image.medium;

      res.status(200).json({
        imageUrl,
        imageAuthor,
        imageAuthorUrl,
        imageAuthorProfileImage,
      });
    } else {
      console.error("Received non-JSON response from Unsplash API.");
      res.status(500).json({ error: "Invalid response format from Unsplash" });
    }
  } catch (error) {
    console.error("Error in fetching hero image:", error);
    res.status(500).json({ error: "Error fetching hero image" });
  }
}
