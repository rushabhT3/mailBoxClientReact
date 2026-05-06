import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const login = async (email, password) => {
  const response = await axios.post(`${BACKEND_URL}/login`, {
    email,
    password,
  });
  return response.data;
};

export const signUp = async (userData) => {
  const response = await axios.post(`${BACKEND_URL}/signUp`, userData);
  return response.data;
};
