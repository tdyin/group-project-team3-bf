import { Router, Request, Response } from 'express';
import { post_register, get_register, post_login, put_logout, getAll, getUserDoc } from '../controllers/UserController';
import verifyRegister from '../middleware/registerCheck';
import loginCheck from '../middleware/loginCheck'

//Set Variable to the Import
const userRoutes = Router();

//Registration
userRoutes.post('/register', post_register);
userRoutes.get('/register', verifyRegister, get_register);


userRoutes.post('/login', post_login);
userRoutes.put('/logout', put_logout)
userRoutes.get('/emp/visa', getAll);
userRoutes.get('/profile', loginCheck, getUserDoc);


export default userRoutes;
