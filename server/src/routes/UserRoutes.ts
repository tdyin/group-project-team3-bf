import { Router } from 'express';
import { post_register, get_register, post_login, put_logout } from '../controllers/UserController';
import verifyRegister from '../middleware/registerCheck';
import loginCheck from '../middleware/loginCheck'

//Set Variable to the Import
const userRoutes = Router();

//Registration
userRoutes.post('/register/:token', post_register);
userRoutes.get('/register/:token', get_register);

//Login and Logout
userRoutes.post('/login', post_login);
userRoutes.put('/logout', loginCheck, put_logout)

export default userRoutes;
