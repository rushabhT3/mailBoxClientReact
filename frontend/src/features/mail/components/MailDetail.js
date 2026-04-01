import React from "react";

const MailDetail = ({ email, onClose }) => {
  return (
    <div className="w-full animate-in fade-in slide-in-from-right-8 duration-700">
      <div className="mb-12">
        <button 
          onClick={onClose}
          className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-500 hover:text-white transition-colors"
        >
          ← Back to messages
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
              From
            </div>
            <div className="text-sm font-bold uppercase tracking-wider text-white">
              {email.sender}
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

export default MailDetail;
