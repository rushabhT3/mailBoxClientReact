import React from "react";
import { useNavigate } from "react-router-dom";

const SentMessageButton = () => {
  const navigate = useNavigate();

  const handleSentMessagesClick = () => {
    navigate("/sentMessage");
  };

  return (
    <button
      type="button"
      className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md shadow-md hover:bg-red-600 fixed top-0 left-0 ml-4 mt-4"
      onClick={handleSentMessagesClick}
    >
      Sent Messages
    </button>
  );
};

export default SentMessageButton;
