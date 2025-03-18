import { z } from "zod";

export const registerSchema = z.object({
  NombreUsuario: z.string({
    required_error: "Username is required",
  }),
  correo: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Email is not valid",
    }),
  contraseña: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
  nombre: z.string({
    required_error: "First name is required",
  }),
  apellidoP: z.string({
    required_error: "Last name (paternal) is required",
  }),
  apellidoM: z.string({
    required_error: "Last name (maternal) is required",
  }),
  celular: z.string({
    required_error: "Phone number is required",
  }),
});

export const loginSchema = z.object({
  correo: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Email is not valid",
    }),
  contraseña: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
});