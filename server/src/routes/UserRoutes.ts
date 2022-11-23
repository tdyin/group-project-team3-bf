import { Router, Request, Response } from 'express';
import { post_register, get_register, post_login } from '../controllers/UserController';
import verifyRegister from '../middleware/registerCheck';

//Set Variable to the Import
const userRoutes = Router();

//Registration
userRoutes.post('/register', post_register);
userRoutes.get('/register', verifyRegister, get_register);

userRoutes.post('/login', post_login);


export default userRoutes;