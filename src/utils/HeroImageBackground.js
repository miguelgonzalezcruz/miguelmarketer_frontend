import { useState, useEffect } from "react";

const HeroImageBackground = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageAuthor, setImageAuthor] = useState(null);
  const [imageAuthorUrl, setImageAuthorUrl] = useState(null);
  const [imageAuthorProfileImage, setImageAuthorProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const accessKey = "cqJiwFQXUMhmy9bc_4E7ExwQ5cFwSaIY-5KsvEbqJ8U";
  // const query = "black%20and%20white%20photography";
  const collections = "Wallpapers";
  const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&collections=${collections}&orientation=landscape&content_filter=high`;

  useEffect(() => {
    const cachedImageData = localStorage.getItem("imageData");
    if (cachedImageData) {
      const {
        imageUrl,
        imageAuthor,
        imageAuthorUrl,
        imageAuthorProfileImage,
        timestamp,
      } = JSON.parse(cachedImageData);
      if (Date.now() - timestamp < 120000) {
        // if the cached data is less than 2 minutes old, use it
        setImageUrl(imageUrl);
        setImageAuthor(imageAuthor);
        setImageAuthorUrl(imageAuthorUrl);
        setImageAuthorProfileImage(imageAuthorProfileImage);
        setIsLoading(false);
        return;
      }
    }

    // fetch the image data from the API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const imageUrl = data.urls.full;
        const imageAuthor = data.user.name;
        const imageAuthorUrl = data.user.links.html;
        const imageAuthorProfileImage = data.user.profile_image.medium;
        setImageUrl(imageUrl);
        setImageAuthor(imageAuthor);
        setImageAuthorUrl(imageAuthorUrl);
        setImageAuthorProfileImage(imageAuthorProfileImage);
        setIsLoading(false);
        // store the image data in the cache
        localStorage.setItem(
          "imageData",
          JSON.stringify({
            imageUrl,
            imageAuthor,
            imageAuthorUrl,
            imageAuthorProfileImage,
            timestamp: Date.now(),
          })
        );
      })
      .catch((error) => console.log(error));
  }, [apiUrl]);

  // update the image every 2 minutes
  useEffect(() => {
    const intervalId = setInterval(() => {
      localStorage.removeItem("imageData");
      setIsLoading(true);
    }, 120000);
    return () => clearInterval(intervalId);
  }, []);

  return {
    imageUrl,
    imageAuthor,
    imageAuthorUrl,
    imageAuthorProfileImage,
    isLoading,
  };
};

export default HeroImageBackground;
