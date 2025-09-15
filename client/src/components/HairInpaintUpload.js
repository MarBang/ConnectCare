import React, { useState } from "react";
import axios from "axios";

function HairInpaintUpload() {
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);

  // Handle image selection and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  // Send image to backend for enhancement
  const handleInpaint = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await axios.post("http://localhost:5000/enhance", formData);
      // Backend returns base64 image
      setResult(`data:image/png;base64,${res.data.image}`);
    } catch (err) {
      console.error("Inpainting failed:", err);
      alert("Inpainting failed. Check console.");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Hair Enhancement</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} />
      <br /><br />

      {/* Preview selected image before enhancement */}
      {preview && (
        <div>
          <h3>Preview:</h3>
          <img src={preview} alt="Preview" style={{ maxWidth: "500px" }} />
        </div>
      )}

      <button onClick={handleInpaint} style={{ marginTop: "10px" }}>
        Enhance Hair
      </button>
      <br /><br />

      {/* Show enhanced image after backend processing */}
      {result && (
        <div>
          <h3>Result:</h3>
          <img src={result} alt="Enhanced" style={{ maxWidth: "500px" }} />
        </div>
      )}
    </div>
  );
}

export default HairInpaintUpload;


