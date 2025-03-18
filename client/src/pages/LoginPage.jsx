import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signinErrors } = useAuth();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        
        {/* Mensajes de error */}
        {signinErrors.length > 0 && (
          <div className="bg-red-500 p-2 text-white text-center mb-4 rounded-md">
            {signinErrors.map((error, i) => (
              <p key={i}>{error}</p>
            ))}
          </div>
        )}

        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

        <form onSubmit={onSubmit}>
          {/* Input de usuario (email o NombreUsuario según backend) */}
          <input
            type="text"
            {...register("NombreUsuario", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Username"
            aria-invalid={errors.NombreUsuario ? "true" : "false"}
          />
          {errors.NombreUsuario && <p className="text-red-500">Username is required</p>}

          {/* Input de contraseña */}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && <p className="text-red-500">Password is required</p>}

          {/* Botón de login con estilos */}
          <button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md my-2"
          >
            Login
          </button>
        </form>

        {/* Link a registro */}
        <p className="flex gap-x-2 justify-between mt-4 text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-sky-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
