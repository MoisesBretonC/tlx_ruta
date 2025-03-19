import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Importar animaciones

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [isExiting, setIsExiting] = useState(false); // Estado para animar salida

  const onSubmit = handleSubmit(async (data) => {
    await signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/welcome");
    }
  }, [isAuthenticated, navigate]);

  const handleSignUpClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate("/register");
    }, 500); // Esperar la animación antes de cambiar de ruta
  };

  return (
    <motion.div
      className="flex h-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Contenedor del login */}
      <motion.div
        className="w-1/2 flex items-center justify-center p-10"
        initial={{ x: 0 }}
        animate={{ x: isExiting ? -50 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
          {signinErrors.length > 0 && (
            <div className="bg-red-500 p-2 text-white text-center mb-4 rounded-md">
              {signinErrors.map((error, i) => (
                <p key={i}>{error}</p>
              ))}
            </div>
          )}

          <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

          <form onSubmit={onSubmit}>
            <input
              type="text"
              {...register("email", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}

            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500">Password is required</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md my-2"
            >
              Login
            </button>
          </form>

          <p className="flex gap-x-2 justify-between mt-4 text-gray-400">
            Don't have an account?{" "}
            <button onClick={handleSignUpClick} className="text-sky-500 hover:underline">
              Sign up
            </button>
          </p>
        </div>
      </motion.div>

      {/* Imagen a la derecha */}
      <motion.div
        className="w-1/2 flex items-center justify-center"
        initial={{ x: 0 }}
        animate={{ x: isExiting ? 50 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="/img/login.jpeg"
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
}

export default LoginPage;
