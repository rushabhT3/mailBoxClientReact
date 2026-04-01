import React, { useState } from "react";
import { sendMail } from "features/mail/api/mailApi";
import { parseJwt } from "features/auth/utils/parseJwt";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const MailComposer = ({ closeDialog }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const content = editorState.getCurrentContent().getPlainText("\u0001");
    try {
      const token = localStorage.getItem("token");
      const decodedToken = parseJwt(token);
      const userEmail = decodedToken.email;

      await sendMail({
        sender: userEmail,
        receiver: to,
        subject: subject,
        content: content,
      });
      
      alert("Transmission successful.");
      setTo("");
      setSubject("");
    } catch (error) {
      console.error("An error occurred while sending the mail:", error);
      alert("Transmission failed.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex justify-between items-center mb-16 px-4">
        <h2 className="text-4xl font-black uppercase tracking-tighter">
          Compose
        </h2>
        <button 
          onClick={closeDialog}
          className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
        >
          [ CLOSE ]
        </button>
      </div>

      <form onSubmit={handleSend} className="space-y-12 px-4">
        <div className="group relative">
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 group-focus-within:text-purple-500 transition-colors">
            Recipient
          </label>
          <input
            type="text"
            className="block w-full bg-transparent border-b border-[#1a1a1a] py-4 focus:outline-none focus:border-purple-600 transition-colors text-xl font-medium"
            placeholder="RECIPIENT@MAIL.COM"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </div>

        <div className="group relative">
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 group-focus-within:text-purple-500 transition-colors">
            Subject Line
          </label>
          <input
            type="text"
            className="block w-full bg-transparent border-b border-[#1a1a1a] py-4 focus:outline-none focus:border-purple-600 transition-colors text-xl font-medium"
            placeholder="URGENT TRANSMISSION"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div className="group relative">
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 group-focus-within:text-purple-500 mb-4 block transition-colors">
            Content
          </label>
          <div className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-sm overflow-hidden editor-container">
            <Editor
              editorState={editorState}
              toolbarClassName="editor-toolbar !bg-[#0c0c0c] !border-b !border-[#1a1a1a] !p-2"
              wrapperClassName="editor-wrapper"
              editorClassName="editor-content h-64 px-4 py-2 text-white overflow-y-auto"
              onEditorStateChange={onEditorStateChange}
              placeholder="Start typing..."
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-6 text-sm font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-300 transform active:scale-[0.98]"
        >
          Send Message 💨
        </button>
      </form>
      
      <style>{`
        .editor-content .public-DraftEditorPlaceholder-root {
          color: #333;
        }
        .rdw-option-wrapper {
          background: #1a1a1a !important;
          border-color: #333 !important;
          color: white !important;
        }
        .rdw-option-wrapper:hover {
          background: #333 !important;
        }
        .rdw-dropdown-wrapper {
          background: #1a1a1a !important;
          border-color: #333 !important;
          color: white !important;
        }
        .rdw-dropdown-optionwrapper {
          background: #1a1a1a !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default MailComposer;
