import express from "express";
import dotenv from "dotenv";
import crypto from "crypto";
import { LexRuntimeV2Client, RecognizeTextCommand } from "@aws-sdk/client-lex-runtime-v2";

dotenv.config();

const required = ["AWS_REGION", "LEX_BOT_ID", "LEX_BOT_ALIAS_ID", "LEX_LOCALE_ID"];
const missing = required.filter((key) => !process.env[key]);

if (missing.length) {
  console.error(`Missing environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

const app = express();
const port = Number(process.env.PORT || 3000);

const lex = new LexRuntimeV2Client({
  region: process.env.AWS_REGION
});

app.use(express.json());
app.use(express.static("public"));

app.post("/api/chat", async (req, res) => {
  try {
    const text = String(req.body?.message || "").trim();
    const sessionId = String(req.body?.sessionId || "").trim();

    if (!text) {
      return res.status(400).json({ error: "Message is required." });
    }

    if (!sessionId) {
      return res.status(400).json({ error: "Session ID is required." });
    }

    const command = new RecognizeTextCommand({
      botId: process.env.LEX_BOT_ID,
      botAliasId: process.env.LEX_BOT_ALIAS_ID,
      localeId: process.env.LEX_LOCALE_ID,
      sessionId,
      text
    });

    const response = await lex.send(command);

    const messages = (response.messages || [])
      .filter((message) => message.content)
      .map((message) => message.content);

    res.json({
      sessionId,
      messages,
      sessionState: response.sessionState || null,
      interpretations: response.interpretations || []
    });
  } catch (error) {
    console.error("Lex request failed:", error);

    res.status(500).json({
      error: "Could not communicate with Amazon Lex.",
      details: error.name || error.message
    });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "car-purchase-local",
    lexLocale: process.env.LEX_LOCALE_ID,
    region: process.env.AWS_REGION
  });
});

app.listen(port, () => {
  console.log(`Car Purchase local app running at http://localhost:${port}`);
});
