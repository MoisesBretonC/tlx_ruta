import {Router} from 'express';
import {register, login, logout,profile} from '../controllers/authController.js';
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validatorMiddleware.js';
import { registerSchema, loginSchema } from '../schemas/authSchema.js';

const router = Router();

router.post('/register', validateSchema(registerSchema) ,register);

router.post('/login', validateSchema(loginSchema), login); 

router.post('/logout', logout);

router.get('/profile',authRequired, profile);

export default router;