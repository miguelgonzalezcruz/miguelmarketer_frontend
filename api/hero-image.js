// src/api/hero-image.js

export default async function handler(req, res) {
  console.log("Serverless function hero-image invoked");

  res.setHeader("Cache-Control", "no-store"); // Desactiva el caché

  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  const collections = "Wallpapers";
  const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&collections=${collections}&orientation=landscape&content_filter=high`;

  try {
    console.log(`Fetching Unsplash API from URL: ${apiUrl}`);

    const response = await fetch(apiUrl);
    console.log(`Response status from Unsplash: ${response.status}`);

    const contentType = response.headers.get("content-type");
    console.log(`Content type of response: ${contentType}`);

    const responseBody = await response.text();
    console.log("Response body as text:", responseBody);

    // Envía la respuesta de la API directamente al cliente para depurar
    return res.status(200).send(responseBody);
  } catch (error) {
    console.error("Error in fetching hero image:", error);
    return res.status(500).json({ error: "Error fetching hero image" });
  }
}

// export default async function handler(req, res) {
//   console.log("Serverless function hero-image invoked");

//   const accessKey = process.env.UNSPLASH_ACCESS_KEY;
//   const collections = "Wallpapers";
//   const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&collections=${collections}&orientation=landscape&content_filter=high`;

//   try {
//     console.log(`Fetching Unsplash API from URL: ${apiUrl}`);

//     const response = await fetch(apiUrl);
//     console.log(`Response status: ${response.status}`);
//     console.log(`Response headers: ${JSON.stringify([...response.headers])}`);

//     // Verifica si la respuesta es JSON
//     const contentType = response.headers.get("content-type");
//     console.log(`Content type of response: ${contentType}`);

//     const responseBody = await response.text(); // Lee la respuesta como texto
//     console.log("Response body as text:", responseBody);

//     if (contentType && contentType.includes("application/json")) {
//       const data = JSON.parse(responseBody); // Parseamos el JSON manualmente
//       console.log("Parsed JSON from Unsplash API:", data);

//       const imageUrl = data.urls.full;
//       const imageAuthor = data.user.name;
//       const imageAuthorUrl = data.user.links.html;
//       const imageAuthorProfileImage = data.user.profile_image.medium;

//       // Enviar la respuesta una vez que tenemos los datos
//       return res.status(200).json({
//         imageUrl,
//         imageAuthor,
//         imageAuthorUrl,
//         imageAuthorProfileImage,
//       });
//     } else {
//       // Si no es JSON, reportamos el error
//       console.error("Received non-JSON response from Unsplash API.");
//       return res
//         .status(500)
//         .json({ error: "Invalid response format from Unsplash" });
//     }
//   } catch (error) {
//     console.error("Error in fetching hero image:", error);
//     return res.status(500).json({ error: "Error fetching hero image" });
//   }
// }
