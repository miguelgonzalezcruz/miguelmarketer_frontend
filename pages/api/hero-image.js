export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Only GET requests are allowed" });
  }

  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  const collections = "Wallpapers";
  const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&collections=${collections}&orientation=landscape&content_filter=high`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const imageUrl = data?.urls?.full;
    const imageAuthor = data?.user?.name;
    const imageAuthorUrl = data?.user?.links?.html;
    const imageAuthorProfileImage = data?.user?.profile_image?.medium;

    return res.status(200).json({
      imageUrl,
      imageAuthor,
      imageAuthorUrl,
      imageAuthorProfileImage,
    });
  } catch (error) {
    console.error("Error in fetching hero image:", error);
    return res.status(500).json({ error: "Error fetching hero image" });
  }
}
