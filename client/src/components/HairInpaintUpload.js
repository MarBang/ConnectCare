import React, { useState, useRef } from "react";
import { handleInpaint } from "../services/api";
import "./HairInpaintUpload.css";

function HairInpaintUpload() {
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setResult(null); // reset previous result if any

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
      setLoading(true);
      const enhancedImage = await handleInpaint(imageFile);
      setResult(enhancedImage);
    } catch (err) {
      alert("Inpainting failed. Check console.");
      console.error(err);
    } finally {
      setLoading(false);
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
                    src="https://media.istockphoto.com/id/1033886776/vector/thin-line-black-camera-like-upload-your-photo.jpg?s=612x612&w=0&k=20&c=HjI4A9Y2NWQGaCWAqVHjavlaAxNwWnWONYCsJBgo7D8="
                    alt="Placeholder"
                />
            )}
          </button>
        </div>

        <div className="right">
          <h2>ConnectCare - AI</h2>
          <h4>Upload a photo and see a realistic simulation in seconds.</h4>

          <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden-input"
              onChange={handleFileChange}
          />

          {/* Only show button when an image is selected */}
          {imageFile && (
              <button
                  className="btn"
                  onClick={onEnhanceClick}
                  disabled={loading}
              >
                {loading ? "Enhancing..." : "Enhance Hair"}
              </button>
          )}
        </div>
      </div>
  );
}

export default HairInpaintUpload;
