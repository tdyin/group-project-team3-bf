import { Router } from 'express';
import { post_email, get_hiring } from '../controllers/HRController';
//Set variable to import
const hrRoutes = Router();

//Hiring Management
hrRoutes.get('/hr/hiring', get_hiring);
hrRoutes.post('/hr/hiring/confirmation', post_email);

export default hrRoutes;