import express from "express";
import dotenv from "dotenv";
import { oauth2Client, SCOPES } from "./config/oauth.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001; // Changed to 3001

// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to IntelliMail!");
});

// Route for Google OAuth consent screen
app.get("/oauth/google", (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  res.redirect(authUrl);
});

// Handle OAuth2 callback
app.get("/oauth2callback", async (req, res) => {
  const code = req.query.code;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    res.send("Authentication successful!");
  } catch (error) {
    console.error("Error getting tokens:", error);
    res.status(500).send("Authentication failed.");
  }
});

app.listen(port, () => {
  console.log(`IntelliMail is running at http://localhost:${port}`);
});
