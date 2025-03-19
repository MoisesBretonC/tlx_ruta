import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    await signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex h-screen">
      {/* Contenedor del login */}
      <div className="w-2/3 flex items-center justify-center p-10 ">
        <div className="bg-zinc-800 max-w-lg w-full p-16 rounded-md">
          <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

          <form onSubmit={onSubmit}>
            <input
              type="text"
              {...register("email", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-3 rounded-md my-3"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}

            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-3 rounded-md my-3"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500">Password is required</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-md my-3"
            >
              Login
            </button>
          </form>

          <p className="flex gap-x-2 justify-between mt-6 text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-sky-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Imagen a la derecha */}
      <div className="w-1/2 flex items-center justify-center mx-3">
        <img
          src="/img/login.jpeg"
          alt="Login Illustration"
          className="w-80% h-80% object-cover"
        />
      </div>
    </div>
  );
}

export default LoginPage;
