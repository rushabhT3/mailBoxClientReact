import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MailComposer from "features/mail/components/MailComposer";
import MailList from "features/mail/components/MailList";

const MainPage = () => {
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  const openDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    const isConfirmed = window.confirm(
      "Are you sure? The message won't be saved."
    );
    if (isConfirmed) {
      setShowDialog(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#050505] text-white">
      {/* Sticky Header/Sidebar */}
      <div className="lg:w-1/3 p-12 lg:sticky lg:top-0 h-fit lg:h-screen flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#1a1a1a]">
        <div>
          <h1 className="text-[10vw] lg:text-[8vw] font-black leading-[0.8] tracking-tighter uppercase mb-12">
            In<br/>box
          </h1>
          <nav className="flex flex-col space-y-6">
            <button 
              onClick={openDialog}
              className="group flex items-center text-xs font-black uppercase tracking-[0.3em] hover:text-purple-500 transition-colors"
            >
              <span className="w-8 h-[1px] bg-white mr-4 group-hover:bg-purple-500 group-hover:w-12 transition-all"></span>
              Compose
            </button>
            <button 
              onClick={() => navigate("/sentMessage")}
              className="group flex items-center text-xs font-black uppercase tracking-[0.3em] hover:text-purple-500 transition-colors text-gray-500"
            >
              <span className="w-8 h-[1px] bg-gray-500 mr-4 group-hover:bg-purple-500 group-hover:w-12 transition-all"></span>
              Sent
            </button>
            <button 
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
              className="group flex items-center text-xs font-black uppercase tracking-[0.3em] hover:text-red-500 transition-colors text-gray-700"
            >
              <span className="w-8 h-[1px] bg-gray-700 mr-4 group-hover:bg-red-500 transition-all"></span>
              Logout
            </button>
          </nav>
        </div>
        <div className="mt-24 lg:mt-0 text-[10px] text-gray-600 uppercase tracking-widest font-bold">
           EST. 2026 / MAILBOX CLIENT v1.0
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:w-2/3 min-h-screen relative">
        {showDialog ? (
          <div className="p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <MailComposer closeDialog={closeDialog} />
          </div>
        ) : (
          <div className="py-12 px-6 lg:px-12">
            <MailList />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
