/*
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

      <input type="file" accept="image*/
/*" onChange={handleFileChange} />
      <br /><br />

      {*/
/* Preview selected image before enhancement *//*
}
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

      {*/
/* Show enhanced image after backend processing *//*
}
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
*/

import React, { useState } from "react";
import axios from "axios";
import "./HairInpaintUpload.css";

function HairInpaintUpload() {
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);

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

  const handleInpaint = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await axios.post("http://localhost:5000/enhance", formData);
      setResult(`data:image/png;base64,${res.data.image}`);
    } catch (err) {
      console.error("Inpainting failed:", err);
      alert("Inpainting failed. Check console.");
    }
  };

  return (
    <div className="rp-card">
      <div className="rp-left">
        <h2 className="rp-title">Se ditt potensielle resultat</h2>
        <p className="rp-subtitle">
          Last opp et bilde og se en realistisk simulering på sekunder.
        </p>
        <ul className="rp-perks">
          <li className="rp-perk">
            <svg className="rp-check" viewBox="0 0 24 24">
              <path
                d="M9 16.17l-3.88-3.88a1 1 0 10-1.41 1.41l4.59 4.59a1 1 0 001.41 0l10-10a1 1 0 10-1.41-1.41L9 16.17z"
                fill="currentColor"
              />
            </svg>
            Kostnadsfritt
          </li>
          <li className="rp-perk">
            <svg className="rp-check" viewBox="0 0 24 24">
              <path
                d="M9 16.17l-3.88-3.88a1 1 0 10-1.41 1.41l4.59 4.59a1 1 0 001.41 0l10-10a1 1 0 10-1.41-1.41L9 16.17z"
                fill="currentColor"
              />
            </svg>
            Uforpliktende
          </li>
        </ul>

        <input type="file" accept="image/*" onChange={handleFileChange} />
        <br />
        <br />

        <button className="rp-btn" onClick={handleInpaint}>
          Prøv nå
        </button>
      </div>

      <div className="rp-right">
        <div className="rp-portrait-wrap">
          {result ? (
            <img
              className="rp-portrait"
              src={result}
              alt="Enhanced"
            />
          ) : preview ? (
            <img
              className="rp-portrait"
              src={preview}
              alt="Preview"
            />
          ) : (
            <img
              className="rp-portrait"
              src="https://via.placeholder.com/260x300.png?text=Bilde"
              alt="Portrett"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default HairInpaintUpload;



