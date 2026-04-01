import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const fetchMails = async (userEmail) => {
  const response = await axios.get(`${BASE_URL}/findMails/?receiver=${userEmail}`);
  return response.data;
};

export const deleteMail = async (emailId) => {
  const response = await axios.delete(`${BASE_URL}/deleteEmail/${emailId}`);
  return response.data;
};

export const markAsRead = async (emailId) => {
  const response = await axios.post(`${BASE_URL}/markAsRead`, { emailKiId: emailId });
  return response.data;
};

export const sendMail = async (mailData) => {
  const response = await axios.post(`${BASE_URL}/compose`, mailData);
  return response.data;
};

export const fetchSentMessages = async (userEmail) => {
  const response = await axios.get(`${BASE_URL}/getSentMessages/${userEmail}`);
  return response.data;
};
