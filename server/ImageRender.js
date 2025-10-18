const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();
app.use(cors());

// Memory-only file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Serve React frontend
app.use(express.static(path.join(__dirname, "public")));

// Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// /enhance endpoint
app.post("/enhance", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const base64Image = req.file.buffer.toString("base64");

    const prompt = [
      { text: "Enhance hair to look full and natural while keeping face unchanged" },
      { inlineData: { mimeType: req.file.mimetype, data: base64Image } },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image-preview",
      contents: prompt,
    });

    const imagePart = response.candidates[0].content.parts.find((p) => p.inlineData);
    if (!imagePart) return res.status(500).json({ error: "No image returned" });

    const generatedImage = Buffer.from(imagePart.inlineData.data, "base64");
    res.set("Content-Type", "image/png");
    res.send(generatedImage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error enhancing image" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
