import React, { useState, useRef } from "react";
import { handleInpaint } from "../services/api";
import "./HairInpaintUpload.css";

function HairInpaintUpload() {
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

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

  const onEnhanceClick = async () => {
    if (!imageFile) return;

    try {
      const enhancedImage = await handleInpaint(imageFile);
      setResult(enhancedImage);
    } catch (err) {
      alert("Inpainting failed. Check console.");
    }
  };

  return (
    <div className="card">
      <div className="left">
        <button className="img-btn" onClick={() => fileInputRef.current.click()}>
          {result ? (
            <img className="img" src={result} alt="Enhanced" />
          ) : preview ? (
            <img className="img" src={preview} alt="Preview" />
          ) : (
            <img
              className="img"
              src="https://colorspaceartandimaging.com/wp-content/uploads/2013/07/Very-Basic-Upload-icon.jpg"
              alt="Placeholder"
            />
          )}
        </button>
      </div>

      <div className="right">
        <h3>Se ditt potensielle resultat</h3>
        <h4>Last opp et bilde og se en realistisk simulering på sekunder.</h4>

        <ul className="rp-perks">
          <li>Kostnadsfritt</li>
          <li>Uforpliktende</li>
        </ul>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden-input"
          onChange={handleFileChange}
        />

        <button className="btn" onClick={onEnhanceClick}>
          Enhance Hair
        </button>
      </div>
    </div>
  );
}

export default HairInpaintUpload;


