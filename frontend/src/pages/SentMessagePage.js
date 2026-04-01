import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSentMessages } from "features/mail/api/mailApi";
import { parseJwt } from "features/auth/utils/parseJwt";

const MailDetailView = ({ email, onClose }) => {
  return (
    <div className="w-full animate-in fade-in slide-in-from-right-8 duration-700">
      <div className="mb-12">
        <button 
          onClick={onClose}
          className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-500 hover:text-white transition-colors"
        >
          ← Back to outbox
        </button>
      </div>

      <div className="space-y-12">
        <div className="border-b border-[#1a1a1a] pb-12">
           <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">
            Subject
          </div>
          <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter leading-tight">
            {email.subject}
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-24 space-y-8 lg:space-y-0">
          <div className="lg:w-1/4">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">
              Recipient
            </div>
            <div className="text-sm font-bold uppercase tracking-wider text-white">
              {email.receiver}
            </div>
          </div>
          
          <div className="lg:w-3/4">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">
              Transmission Content
            </div>
            <div className="text-lg leading-relaxed text-gray-300 font-light whitespace-pre-wrap">
              {email.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SentMessagePage = () => {
  const [sentMessages, setSentMessages] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const decodedToken = parseJwt(token);
  const userEmail = decodedToken.email;

  useEffect(() => {
    const getSentMessages = async () => {
      try {
        const data = await fetchSentMessages(userEmail);
        setSentMessages(data.sentMessages);
      } catch (error) {
        console.error("Error fetching sent messages:", error.response?.data);
      }
    };
    getSentMessages();
  }, [userEmail]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#050505] text-white">
      {/* Sticky Header/Sidebar */}
      <div className="lg:w-1/3 p-12 lg:sticky lg:top-0 h-fit lg:h-screen flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#1a1a1a]">
        <div>
          <h1 className="text-[10vw] lg:text-[8vw] font-black leading-[0.8] tracking-tighter uppercase mb-12">
            Out<br/>box
          </h1>
          <nav className="flex flex-col space-y-6">
            <button 
              onClick={() => navigate("/main")}
              className="group flex items-center text-xs font-black uppercase tracking-[0.3em] hover:text-purple-500 transition-colors"
            >
              <span className="w-8 h-[1px] bg-white mr-4 group-hover:bg-purple-500 group-hover:w-12 transition-all"></span>
              Inbox
            </button>
            <button 
              className="group flex items-center text-xs font-black uppercase tracking-[0.3em] text-gray-500 cursor-default"
            >
              <span className="w-8 h-[1px] bg-gray-500 mr-4"></span>
              Sent
            </button>
          </nav>
        </div>
        <div className="mt-24 lg:mt-0 text-[10px] text-gray-600 uppercase tracking-widest font-bold">
           EST. 2026 / MAILBOX CLIENT v1.0
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:w-2/3 min-h-screen relative">
        <div className="py-12 px-6 lg:px-12">
          {selectedEmail ? (
            <MailDetailView 
              email={selectedEmail} 
              onClose={() => setSelectedEmail(null)} 
            />
          ) : (
            <div className="w-full">
              <div className="flex justify-between items-end mb-16 px-4">
                <h2 className="text-4xl font-black uppercase tracking-tighter">
                  Sent
                </h2>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                  Total Transmissions: {sentMessages.length}
                </div>
              </div>

              <div className="space-y-1">
                {/* List Header */}
                <div className="flex px-4 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 border-b border-[#1a1a1a]">
                  <div className="w-1/4">Recipient</div>
                  <div className="w-3/4">Subject / Content</div>
                </div>

                {/* List Body */}
                <div className="divide-y divide-[#1a1a1a]">
                  {sentMessages.length === 0 ? (
                    <div className="p-12 text-center text-gray-700 uppercase tracking-widest text-xs font-bold">
                      No sent data found.
                    </div>
                  ) : (
                    sentMessages.map((message) => (
                      <div 
                        key={message.id}
                        onClick={() => setSelectedEmail(message)}
                        className="group flex items-center px-4 py-6 hover:bg-[#111111] transition-all cursor-pointer"
                      >
                        <div className="w-1/4 truncate text-sm font-bold uppercase tracking-wider text-white">
                          {message.receiver.split('@')[0]}
                        </div>
                        <div className="w-3/4 flex flex-col">
                          <span className="text-sm tracking-tight truncate text-white font-bold">
                            {message.subject}
                          </span>
                          <span className="text-xs text-gray-600 truncate mt-1 italic">
                            {message.content}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SentMessagePage;
