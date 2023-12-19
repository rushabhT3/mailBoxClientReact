import React, { useState, useEffect } from "react";
import axios from "axios";

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

const MailTable = () => {
  const [emails, setEmails] = useState([]);

  const token = localStorage.getItem("token");
  const decodedToken = parseJwt(token);
  const userEmail = decodedToken.email;

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/findMails/?sender=${userEmail}`
        );
        setEmails(response.data.emails);
      } catch (error) {
        console.error("Error fetching emails:", error.response.data);
      }
    };

    fetchEmails();
  }, []);

  return (
    <div className="px-10">
      <h2>Your Emails 😀</h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mx-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
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
              <tr key={email.id}>
                <td className="px-6 py-4 font-medium">{email.receiver}</td>
                <td className="px-6 py-4">{email.subject}</td>
                <td className="px-6 py-4">{email.content}</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                  <span className="mx-2">|</span>{" "}
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MailTable;
