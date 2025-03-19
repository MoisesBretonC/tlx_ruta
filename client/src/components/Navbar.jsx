import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <header style={{
        display: "flex",
        flexDirection: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#fff",
        border: "none",
        color: "#000",
        fontWeight: "bold",
        padding: "0.5rem 2rem",
        boxShadow: "0rem 0rem 1rem rgba(0, 0, 0, 0.6)",
        position: "sticky",
        top: 0,
        zIndex: 1000
    }}>
        <Link to="/" style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            fontSize: "1.5rem"
        }}>
            TLX-Ruta
        </Link>
        <nav style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem"
        }}>
            <Link to="/" style={{ marginRight: "15px", textDecoration: "none" }}>
                Inicio
            </Link>
            <Link to="/about" style={{ textDecoration: "none" }}>
                Sobre Nosotros
            </Link>
            <button
                onClick={() => navigate("/register")}
                className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
            >
                Registrarse
            </button>
        </nav>
    </header>
  );
};

export default Navbar;
