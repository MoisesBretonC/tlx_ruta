import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion"; // Importar animaciones

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  const [isExiting, setIsExiting] = useState(false); // Estado para animar salida

  useEffect(() => {
    if (isAuthenticated) navigate('/login');
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  const handleLoginClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate("/login");
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
      {/* Imagen a la izquierda */}
      <motion.div
        className="w-1/2 flex items-center justify-center"
        initial={{ x: 0 }}
        animate={{ x: isExiting ? -50 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="/img/login.jpeg"
          alt="Register Illustration"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Contenedor del formulario de registro */}
      <motion.div
        className="w-full md:w-1/2 flex items-center justify-center p-10"
        initial={{ x: 0 }}
        animate={{ x: isExiting ? 50 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
          {/* Mostrar errores de registro */}
          {registerErrors.length > 0 && (
            <div className="bg-red-500 p-2 text-white text-center mb-4 rounded-md">
              {registerErrors.map((error, i) => (
                <p key={i}>{error}</p>
              ))}
            </div>
                  )}

          <h1 className="text-2xl font-bold text-center mb-4">Register</h1>

          {/* Formulario */}
          <form onSubmit={onSubmit}>
            <input
              type="text"
              {...register("username", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="UserName"
            />
            {errors.username && <p className="text-red-500">Username is required</p>}

            <input
              type="email"
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
            {errors.password && <p className="text-red-500">Password is required</p>}

            <input
              type="text"
              {...register("firstName", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="First Name"
            />
            {errors.firstName && <p className="text-red-500">First name is required</p>}

            <input
              type="text"
              {...register("lastName", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Last Name"
            />
            {errors.lastName && <p className="text-red-500">Last name is required</p>}

            <input
              type="text"
              {...register("phone", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Phone"
            />
            {errors.phone && <p className="text-red-500">Phone is required</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md my-2"
            >
              Register
            </button>
          </form>

          <p className="flex gap-x-2 justify-between mt-4 text-gray-400">
            Already have an account?{" "}
            <button onClick={handleLoginClick} className="text-sky-500 hover:underline">
              Login
            </button>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default RegisterPage;

