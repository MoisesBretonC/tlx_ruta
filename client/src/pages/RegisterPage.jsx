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
            {...register("username", { required: "Username is required", minLength: { value: 3, message: "Minimum 3 characters" } })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Username"
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}

          {/* Email */}
          <input
            type="email"
            {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" } })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          {/* Password */}
          <input
            type="password"
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          {/* Nombre */}
          <input
            type="text"
            {...register("nombre", { required: "Nombre is required" })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Nombre"
          />
          {errors.nombre && <p className="text-red-500">{errors.nombre.message}</p>}

          {/* Apellido Paterno */}
          <input
            type="text"
            {...register("apellidoP", { required: "Apellido Paterno is required" })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Apellido Paterno"
          />
          {errors.apellidoP && <p className="text-red-500">{errors.apellidoP.message}</p>}

          {/* Apellido Materno */}
          <input
            type="text"
            {...register("apellidoM", { required: "Apellido Materno is required" })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Apellido Materno"
          />
          {errors.apellidoM && <p className="text-red-500">{errors.apellidoM.message}</p>}

          {/* Celular */}
          <input
            type="text"
            {...register("celular", { required: "Celular is required", pattern: { value: /^[0-9]+$/, message: "Only numbers allowed" } })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Celular"
          />
          {errors.celular && <p className="text-red-500">{errors.celular.message}</p>}

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

