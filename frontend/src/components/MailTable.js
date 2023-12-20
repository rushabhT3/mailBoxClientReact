import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import ParseJWT from "./ParseJWT";
import IndividualEmail from "./IndividualEmail";

const MailTable = () => {
  const [emails, setEmails] = useState([]);
  const [openEmailId, setOpenEmailId] = useState(null);

  const token = localStorage.getItem("token");
  const decodedToken = ParseJWT(token);
  const userEmail = decodedToken.email;

  const unreadCount = emails.filter((email) => !email.isRead).length;

  useEffect(() => {
    const fetchEmailsInterval = setInterval(async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/findMails/?receiver=${userEmail}`
        );
        const newEmails = response.data.emails;
        // if (newEmails.length > emails.length) {
        // console.log("not hehe", newEmails.length, emails.length);
        setEmails(newEmails);
        // }
      } catch (error) {
        console.error("Error fetching emails:", error.response.data);
      }
    }, 2000);
    return () => clearInterval(fetchEmailsInterval); // ! Clear interval on unmount
  }, []);

  const handleDelete = useCallback(
    async (emailKiId) => {
      try {
        await axios.delete(`http://localhost:3001/deleteEmail/${emailKiId}`);
        setEmails((prevEmails) =>
          prevEmails.filter((email) => email.id !== emailKiId)
        );
      } catch (error) {
        console.error("Error deleting email:", error.response.data);
      }
    },
    [emails]
  );

  const markAsRead = useCallback(
    async (emailKiId) => {
      try {
        await axios.post(`http://localhost:3001/markAsRead`, { emailKiId });
        setEmails((prevEmails) => {
          return prevEmails.map((email) => {
            if (email.id === emailKiId) {
              return { ...email, isRead: true };
            } else {
              return email;
            }
          });
        });
      } catch (error) {
        console.error("Error marking email as read:", error.response.data);
      }
    },
    [emails]
  );

  return (
    <div className="px-10">
      <h2 className="text-2xl font-semibold mb-4">
        Your Emails 😀{" "}
        {unreadCount > 0 && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            {unreadCount}
          </span>
        )}
      </h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {openEmailId ? (
          <IndividualEmail
            email={emails.find((e) => e.id === openEmailId)}
            onClose={() => setOpenEmailId(null)}
          />
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mx-auto">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Read/Not
                </th>
                <th scope="col" className="px-6 py-4">
                  Sender
                </th>
                <th scope="col" className="px-6 py-4">
                  Subject
                </th>
                <th scope="col" className="px-6 py-4">
                  Content
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              {emails.map((email) => (
                <tr key={email.id} onClick={() => setOpenEmailId(email.id)}>
                  <td className="px-6 py-4">
                    {email.isRead ? (
                      <span className="text-gray-500 dark:text-gray-400">
                        &#8226;
                      </span>
                    ) : (
                      <span className="text-yellow-500">&#8226;</span>
                    )}
                    <button
                      className={`font-medium ${
                        email.isRead
                          ? "text-gray-600 dark:text-gray-400"
                          : "text-blue-600 dark:text-yellow-500 hover:underline"
                      }`}
                      // ! this is how to disable it
                      disabled={email.isRead}
                      onClick={() => markAsRead(email.id)}
                    >
                      {email.isRead ? "Already Read" : "Not Read"}
                    </button>
                  </td>
                  <td className="px-6 py-4 font-medium">{email.sender}</td>
                  <td className="px-6 py-4">{email.subject}</td>
                  <td className="px-6 py-4">{email.content}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(email.id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MailTable;
