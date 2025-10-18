//const express = require("express");
//const multer = require("multer");
//const cors = require("cors");
//const fs = require("fs");
//const dotenv = require("dotenv");
//const OpenAI = require("openai");
//
//dotenv.config();
//
//const app = express();
//app.use(cors());
//const upload = multer({ dest: "uploads/" });
//
////Azure OpenAI client
//const client = new OpenAI({
//  apiKey: process.env.AZURE_OPENAI_API_KEY,
//  baseURL: process.env.AZURE_OPENAI_ENDPOINT, // e.g. "https://<your-resource-name>.openai.azure.com/openai/deployments/<deployment-name>"
//});
//
////Route: Upload image → Enhance hair → Return enhanced image
//app.post("/enhance", upload.single("image"), async (req, res) => {
//  try {
//    const imagePath = req.file.path;
//
//    // Convert uploaded image to base64
//    const imageData = fs.readFileSync(imagePath);
//    const base64Image = imageData.toString("base64");
//
//    // Call Azure OpenAI gpt-image-1
//    const response = await client.images.generate({
//      model: "gpt-image-1",
//      prompt: "Enhance hair to look full and natural while keeping the face unchanged",
//      size: "1024x1024",
//      image: base64Image, // input image
//    });
//
//    // Extract base64 image from response
//    const imageBase64 = response.data[0].b64_json;
//
//    res.json({ image: imageBase64 });
//  } catch (err) {
//    console.error("Enhancement failed:", err.response?.data || err.message);
//    res.status(500).json({ error: "Error enhancing image" });
//  }
//});
//
//const PORT = process.env.PORT || 5000;
//app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
