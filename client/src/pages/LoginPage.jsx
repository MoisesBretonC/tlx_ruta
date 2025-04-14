import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, isAuthenticated, user, errors: loginErrors } = useAuth();
  const navigate = useNavigate();

  const [isExiting, setIsExiting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signin(data);
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      setIsExiting(true);
      setTimeout(() => {
        switch(user.userType) {
          case 'monitor':
            navigate('/admin');
            break;
          case 'concessionaire':
            navigate('/concessionaire');
            break;
          case 'operator':
            navigate('/operator');
            break;
          default:
            navigate('/home');
        }
      }, 500);
    }
  }, [isAuthenticated, user, navigate]);

  const handleRegisterClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate("/register");
    }, 500);
  };

  return (
    <motion.div
      className="flex h-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Contenedor del formulario de login (ahora a la izquierda) */}
      <motion.div
        className="w-full md:w-1/2 flex items-center justify-center p-10"
        initial={{ x: 0 }}
        animate={{ x: isExiting ? -50 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
          {/* Mostrar errores de login */}
          {loginErrors.length > 0 && (
            <div className="bg-red-500 p-2 text-white text-center mb-4 rounded-md">
              {loginErrors.map((error, i) => (
                <p key={i}>{error}</p>
              ))}
            </div>
          )}

          <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

          {/* Formulario */}
          <form onSubmit={onSubmit}>
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

            <div className="flex items-center justify-between my-2">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-sky-500 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md my-2"
            >
              Login
            </button>
          </form>

          <p className="flex gap-x-2 justify-between mt-4 text-gray-400">
            Don't have an account?{" "}
            <button 
              onClick={handleRegisterClick} 
              className="text-sky-500 hover:underline"
            >
              Register
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