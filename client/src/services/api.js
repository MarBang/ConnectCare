import axios from 'axios';

const API_URL = 'http://localhost:4000'; // Our Express backend

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // { id, email, name }
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};