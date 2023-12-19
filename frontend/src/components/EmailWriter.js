import React, { useState } from "react";
import axios from "axios";

import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// ? parseJwt function
function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

const EmailWriter = ({ closeDialog }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleSend = async () => {
    const content = editorState.getCurrentContent().getPlainText("\u0001");
    try {
      const token = localStorage.getItem("token");
      const decodedToken = parseJwt(token);
      // console.log("Decoded Token:", decodedToken);

      // ? Access payload data (example: userId, email)
      // const userId = decodedToken.userId;
      const userEmail = decodedToken.email;

      const response = await axios.post("http://localhost:3001/compose", {
        sender: userEmail,
        receiver: to,
        subject: subject,
        content: content,
      });
      console.log(response.data);
      alert("sent successfully");
      setTo("");
      setSubject("");
    } catch (error) {
      console.error("An error occurred while sending the mail:", error);
      alert(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
        <div className="fixed top-0 left-0 w-full h-screen bg-gray-900 opacity-75 flex flex-col items-center justify-center">
          <div className="bg-white p-8 rounded-md shadow-lg w-full md:w-3/4 lg:w-1/2 xl:w-2/3 h-5/6">
            <form onSubmit={handleSend} className="space-y-6">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="To"
                  className="border px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
                <button
                  type="button"
                  className="ml-2 text-gray-400 hover:text-gray-500"
                  onClick={closeDialog}
                >
                  ❌
                </button>
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="border px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <Editor
                editorState={editorState}
                toolbarClassName="border-b px-3 py-2 rounded-md"
                wrapperClassName="border rounded-md"
                editorClassName="h-32 resize-none px-3 py-2"
                onEditorStateChange={onEditorStateChange}
                placeholder="start writing your email"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500 mr-2"
                  onClick={closeDialog}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
                >
                  Send 💨
                </button>
              </div>
            </form>
          </div>
        </div>
    </div>
  );
};

export default EmailWriter;
