import React, { useState, useEffect, useCallback } from "react";
import { fetchMails, deleteMail, markAsRead as markReadApi } from "features/mail/api/mailApi";
import { parseJwt } from "features/auth/utils/parseJwt";
import MailDetail from "./MailDetail";

const MailList = () => {
  const [emails, setEmails] = useState([]);
  const [openEmailId, setOpenEmailId] = useState(null);

  const token = localStorage.getItem("token");
  const decodedToken = parseJwt(token);
  const userEmail = decodedToken.email;

  const unreadCount = emails.filter((email) => !email.isRead).length;

  useEffect(() => {
    const fetchEmailsInterval = setInterval(async () => {
      try {
        const data = await fetchMails(userEmail);
        setEmails(data.emails);
      } catch (error) {
        console.error("Error fetching emails:", error.response?.data);
      }
    }, 2000);
    return () => clearInterval(fetchEmailsInterval);
  }, [userEmail]);

  const handleDelete = useCallback(async (emailId) => {
    try {
      await deleteMail(emailId);
      setEmails((prevEmails) =>
        prevEmails.filter((email) => email.id !== emailId)
      );
    } catch (error) {
      console.error("Error deleting email:", error.response?.data);
    }
  }, []);

  const handleMarkAsRead = useCallback(async (emailId) => {
    try {
      await markReadApi(emailId);
      setEmails((prevEmails) =>
        prevEmails.map((email) =>
          email.id === emailId ? { ...email, isRead: true } : email
        )
      );
    } catch (error) {
      console.error("Error marking email as read:", error.response?.data);
    }
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-16 px-4">
        <h2 className="text-4xl font-black uppercase tracking-tighter">
          Messages
        </h2>
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
          Unread: <span className="text-purple-500">{unreadCount}</span> / Total: {emails.length}
        </div>
      </div>

      {openEmailId ? (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
          <MailDetail
            email={emails.find((e) => e.id === openEmailId)}
            onClose={() => setOpenEmailId(null)}
          />
        </div>
      ) : (
        <div className="space-y-1">
          <div className="flex px-4 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 border-b border-[#1a1a1a]">
            <div className="w-8"></div>
            <div className="w-1/4">Sender</div>
            <div className="w-1/2">Subject / Content</div>
            <div className="w-1/4 text-right">Actions</div>
          </div>

          <div className="divide-y divide-[#1a1a1a]">
            {emails.length === 0 ? (
               <div className="p-12 text-center text-gray-700 uppercase tracking-widest text-xs font-bold">
                No active transmissions found.
              </div>
            ) : (
              emails.map((email) => (
                <div 
                  key={email.id}
                  onClick={() => {
                    handleMarkAsRead(email.id);
                    setOpenEmailId(email.id);
                  }}
                  className="group flex items-center px-4 py-6 hover:bg-[#111111] transition-all cursor-pointer"
                >
                  <div className="w-8 flex items-center">
                    {!email.isRead && (
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse shadow-[0_0_10px_#a855f7]"></div>
                    )}
                  </div>
                  <div className={`w-1/4 truncate text-sm font-bold uppercase tracking-wider ${email.isRead ? 'text-gray-500' : 'text-white'}`}>
                    {email.sender.split('@')[0]}
                  </div>
                  <div className="w-1/2 flex flex-col">
                    <span className={`text-sm tracking-tight truncate ${email.isRead ? 'text-gray-400 font-normal' : 'text-white font-bold'}`}>
                      {email.subject}
                    </span>
                    <span className="text-xs text-gray-600 truncate mt-1 italic">
                      {email.content}
                    </span>
                  </div>
                  <div className="w-1/4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(email.id);
                      }}
                      className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-red-500 transition-colors"
                    >
                      [ DISCARD ]
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MailList;
