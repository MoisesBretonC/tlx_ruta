import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold mb-6 text-black">HomePage</h1>
      <button
        onClick={() => navigate("/login")}
        className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Ir a Registro
      </button>
    </div>
  );
}

export default HomePage;
