import React, { useState, useEffect } from "react";
import axios from "axios";
import ParseJWT from "../components/ParseJWT";

const IndividualEmailPage = ({ email, onClose }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Subject: {email.subject}</h2>
        <button
          className="bg-gray-100 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-200"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      <p className="text-gray-600 mb-2">To: {email.receiver}</p>
      <p className="text-gray-700">Content: {email.content}</p>
    </div>
  );
};

const SentMessagePage = () => {
  const [sentMessages, setSentMessages] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const token = localStorage.getItem("token");
  const decodedToken = ParseJWT(token);
  const userEmail = decodedToken.email;

  useEffect(() => {
    const getSentMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/getSentMessages/${userEmail}`
        );
        setSentMessages(response.data.sentMessages);
      } catch (error) {
        console.error("Error fetching sent messages:", error.response.data);
      }
    };
    getSentMessages();
  }, []);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const handleClose = () => {
    setSelectedEmail(null);
  };

  return (
    <div className="bg-gray-100">
      {" "}
      {/* Adjust background color */}
      <div className="container mx-auto p-4">
        {" "}
        {/* Add container and padding */}
        <h2 className="text-2xl font-semibold mb-4">Sent Messages</h2>
        {selectedEmail ? (
          <IndividualEmailPage email={selectedEmail} onClose={handleClose} />
        ) : (
          <table className="w-full table-auto min-w-full">
            <thead className="bg-gray-200">
              {" "}
              {/* Adjust header background */}
              <tr>
                <th className="px-4 py-2 text-left">Receiver</th>
                <th className="px-4 py-2 text-left">Subject</th>
                <th className="px-4 py-2 text-left">Content</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sentMessages.map((message) => (
                <tr
                  key={message.id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleEmailClick(message)}
                >
                  <td className="px-4 py-2">{message.receiver}</td>
                  <td className="px-4 py-2">{message.subject}</td>
                  <td className="px-4 py-2">{message.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SentMessagePage;
