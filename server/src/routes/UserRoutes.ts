import { Router, Request, Response } from 'express';
import { post_register } from '../controllers/UserController';

//Set Variable to the Import
const userRoutes = Router();

//Registration
userRoutes.post('/register', post_register);

export default userRoutes;