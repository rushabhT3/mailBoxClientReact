import React from "react";

const IndividualEmail = ({ email, onClose }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Sender: {email.sender}</h3>
        <button
          onClick={onClose}
          className="bg-gray-100 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-200"
        >
          Close
        </button>
      </div>
      <h3 className="text-xl font-semibold mb-2">Subject: {email.subject}</h3>
      <p className="text-gray-700">{email.content}</p>
    </div>
  );
};

export default IndividualEmail;
