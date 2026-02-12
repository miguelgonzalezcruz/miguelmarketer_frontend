import { Client } from "@hubspot/api-client";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }

  const { email, firstname, lastname, message } = req.body || {};

  if (!email || !firstname || !lastname || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hubspotClient = new Client({
    accessToken: process.env.HUBSPOT_API_KEY,
  });

  try {
    await hubspotClient.crm.contacts.basicApi.create({
      properties: {
        email,
        firstname,
        lastname,
        message,
      },
    });

    return res.status(201).json({ message: "Contact created successfully" });
  } catch (error) {
    console.error("Error creating contact:", error);
    return res.status(500).json({ message: "Error creating contact" });
  }
}
