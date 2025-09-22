import { useNavigate } from "react-router-dom";

export default function NotSignedIn() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3 border-b border-orange-200 pb-4 mb-4">
      <button
        type="button"
        onClick={() => navigate("/auth")}
        className="px-4 py-2 text-sm font-medium rounded-lg border border-orange-300 text-orange-700 bg-white
                   hover:bg-orange-50 hover:border-orange-400 cursor-pointer transition-all duration-300"
      >
        Sign in
      </button>
      <button
        type="button"
        onClick={() => navigate("/auth")}
        className="px-4 py-2 text-sm font-medium rounded-lg bg-orange-500 text-white
                   hover:bg-orange-600 cursor-pointer transition-all duration-300"
      >
        Sign up
      </button>
    </div>
  );
}