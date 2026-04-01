import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const login = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/login`, {
    email,
    password,
  });
  return response.data;
};

export const signUp = async (userData) => {
  const response = await axios.post(`${BASE_URL}/signUp`, userData);
  return response.data;
};
