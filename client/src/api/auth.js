// Esto es para la conexion el bEnd y fEnd
import axios from './axios.js';

const API = 'http://localhost:4000/api'

export const registerRequest = user => axios.post(`${API}/register`, user);

export const loginRequest = user => axios.post(`/login`, user);

export const verifyTokenRequest = () => axios.get('/verify', { withCredentials: true });



// Nueva función para obtener datos del usuario
export const getUserDataRequest = () => axios.get('/profile');