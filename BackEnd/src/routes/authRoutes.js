import {Router} from 'express';
import {register, login, logout,profile, verifyToken} from '../controllers/authController.js';
import { authRequired,checkUserType } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validatorMiddleware.js';
import { registerSchema, loginSchema } from '../schemas/authSchema.js';

const router = Router();

router.post('/register', validateSchema(registerSchema) ,register);

router.post('/login', validateSchema(loginSchema), login); 

router.post('/logout', logout);

router.get('/verify', verifyToken);

router.get('/profile',authRequired, profile);

router.get('/admin', authRequired, checkUserType(['monitor']), (req, res) => {
    res.json({ message: "Bienvenido, Monitor" });
});

router.get('/concesionario', authRequired, checkUserType(['concessionaire']), (req, res) => {
    res.json({ message: "Bienvenido, Concesionario" });
});

router.get('/operador', authRequired, checkUserType(['operator']), (req, res) => {
    res.json({ message: "Bienvenido, Operador" });
});


export default router;