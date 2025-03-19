import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./NavbarCons.module.css";

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <header className={styles.header}>
        <Link to="/welcome" style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            fontSize: "1.5rem"
        }}>
            TLX-Ruta
        </Link>
        <div className={styles.herramUser}>
            <div className={[styles.bellNoti, styles.ocultar].join(" ")}>
                Notificaciones
                <hr />
                <div className={styles.noti}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet laborum labore rerum impedit reiciendis ullam praesentium harum beatae quas non deleniti similique, sapiente doloremque veniam? Non deserunt rerum omnis odio.
                </div>
            </div>
            <div className={styles.bell}>
                <span className="fa-solid fa-bell"></span>
            </div>
            <div className={styles.user}>
                <span className="fa-solid fa-user"></span>
            </div>
        </div>
        {/* <nav style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem"
        }}>
            <Link to="/" style={{ marginRight: "15px", textDecoration: "none" }}>
                <span className="fa-solid fa-bell"></span>
            </Link>
            <Link to="/about" style={{ textDecoration: "none" }}>
                Sobre Nosotros
            </Link>
            {/* <button
                onClick={() => navigate("/login")}
                className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
            >
                Iniciar Sesión
            </button> 
        </nav> */}
    </header>
  );
};

export default Navbar;
