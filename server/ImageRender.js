//const express = require("express");
//const multer = require("multer");
//const cors = require("cors");
//const fs = require("fs");
//const dotenv = require("dotenv");
//const { GoogleGenAI } = require("@google/genai");
//
//dotenv.config();
//
//const app = express();
//app.use(cors());
//const upload = multer({ dest: "uploads/" });
//
//const ai = new GoogleGenAI({
//  apiKey: process.env.GEMINI_API_KEY,
//});
//
//app.post("/enhance", upload.single("image"), async (req, res) => {
//  try {
//    const imagePath = req.file.path;
//    const imageData = fs.readFileSync(imagePath);
//    const base64Image = imageData.toString("base64");
//
//    const prompt = [
//      { text: "Enhance hair to look full and natural while keeping face unchanged" },
//      {
//        inlineData: {
//          mimeType: req.file.mimetype,
//          data: base64Image,
//        },
//      },
//    ];
//
//    const response = await ai.models.generateContent({
//      model: "gemini-2.5-flash-image-preview",
//      contents: prompt,
//    });
//
//    const imagePart = response.candidates[0].content.parts.find(
//      (p) => p.inlineData
//    );
//
//    if (!imagePart) {
//      return res.status(500).json({ error: "No image returned from Gemini." });
//    }
//
//    const generatedImage = Buffer.from(imagePart.inlineData.data, "base64");
//
//    res.set("Content-Type", "image/png");
//    res.send(generatedImage);
//  } catch (err) {
//    console.error(err);
//    res.status(500).json({ error: "Error enhancing image" });
//  }
//});
//
//const PORT = process.env.PORT || 5000;
//app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

const app = express();
app.use(cors());
const upload = multer({ dest: "uploads/" });

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/enhance", upload.single("image"), async (req, res) => {
  try {
    const imagePath = req.file.path;
    const imageData = fs.readFileSync(imagePath);
    const base64Image = imageData.toString("base64");

    const prompt = [
      { text: "Enhance hair to look full and natural while keeping face unchanged" },
      {
        inlineData: {
          mimeType: req.file.mimetype,
          data: base64Image,
        },
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image-preview",
      contents: prompt,
    });

    const imagePart = response.candidates[0].content.parts.find(
      (p) => p.inlineData
    );

    if (!imagePart) {
      return res.status(500).json({ error: "No image returned from Gemini." });
    }

    const generatedImage = Buffer.from(imagePart.inlineData.data, "base64");

    res.set("Content-Type", "image/png");
    res.send(generatedImage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error enhancing image" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
