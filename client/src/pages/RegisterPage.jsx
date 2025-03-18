import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {/* Mostrar errores de registro si existen */}
        {registerErrors.length > 0 && (
          <div className="bg-red-500 p-2 text-white text-center mb-4 rounded-md">
            {registerErrors.map((error, i) => (
              <p key={i}>{error}</p>
            ))}
          </div>
        )}

        <h1 className="text-2xl font-bold text-center mb-4">Register</h1>

        <form onSubmit={onSubmit}>
          {/* Username */}
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Username"
            aria-invalid={errors.username ? "true" : "false"}
          />
          {errors.username && <p className="text-red-500">Username is required</p>}

          {/* Email */}
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && <p className="text-red-500">Email is required</p>}

          {/* Password */}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && <p className="text-red-500">Password is required</p>}

          {/* Botón de registro estilizado */}
          <button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md my-2"
          >
            Register
          </button>
        </form>

        {/* Link a login */}
        <p className="flex gap-x-2 justify-between mt-4 text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
