import React from "react";

const ComposeButton = ({ openDialog }) => {
  return (
    <button
      type="button"
      className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md shadow-md hover:bg-blue-600 fixed top-0 right-0 mr-4 mt-4"
      onClick={openDialog}
    >
      Compose Email
    </button>
  );
};

export default ComposeButton;
