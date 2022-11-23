import { Router, Request, Response } from 'express';
import { post_register, post_login } from '../controllers/UserController';

//Set Variable to the Import
const userRoutes = Router();

//Registration
userRoutes.post('/register', post_register);

userRoutes.post('/login', post_login);


export default userRoutes;