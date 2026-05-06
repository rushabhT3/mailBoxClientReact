import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchMails = async (userEmail) => {
  const response = await axios.get(`${BACKEND_URL}/findMails/?receiver=${userEmail}`);
  return response.data;
};

export const deleteMail = async (emailId) => {
  const response = await axios.delete(`${BACKEND_URL}/deleteEmail/${emailId}`);
  return response.data;
};

export const markAsRead = async (emailId) => {
  const response = await axios.post(`${BACKEND_URL}/markAsRead`, { emailKiId: emailId });
  return response.data;
};

export const sendMail = async (mailData) => {
  const response = await axios.post(`${BACKEND_URL}/compose`, mailData);
  return response.data;
};

export const fetchSentMessages = async (userEmail) => {
  const response = await axios.get(`${BACKEND_URL}/getSentMessages/${userEmail}`);
  return response.data;
};
