import axios from 'axios';

export const handleInpaint = async (imageFile) => {
  if (!imageFile) return null;

  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const res = await axios.post("/enhance", formData, {
      responseType: "arraybuffer",
    });

    const base64 = btoa(
      new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
    );

    return `data:image/png;base64,${base64}`;
  } catch (err) {
    console.error("Inpainting failed:", err);
    throw err;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:4000/login", { email, password });
    return response.data; // { id, email, name }
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};