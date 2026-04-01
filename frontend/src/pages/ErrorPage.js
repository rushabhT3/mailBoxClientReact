import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white p-12 text-center">
      <h1 className="text-[20vw] font-black leading-none tracking-tighter uppercase mb-4">
        404
      </h1>
      <p className="text-gray-500 uppercase tracking-[0.4em] text-xs font-bold mb-12">
        Lost in Transmission / Page Not Found
      </p>
      <button 
        onClick={() => navigate("/login")}
        className="group flex items-center text-xs font-black uppercase tracking-[0.3em] hover:text-purple-500 transition-colors"
      >
        <span className="w-8 h-[1px] bg-white mr-4 group-hover:bg-purple-500 group-hover:w-12 transition-all"></span>
        Return to Base
      </button>

      <div className="fixed bottom-12 text-[10px] text-gray-800 uppercase tracking-widest font-bold">
        ERROR_CODE: NULL_REFERENCE
      </div>
    </div>
  );
}
