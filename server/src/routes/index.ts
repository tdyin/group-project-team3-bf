import { Router } from 'express';
import userRoutes from './UserRoutes'
import personalRoutes from './PersonalInfoRoutes'

const routes = Router();

routes.use(userRoutes);
routes.use(personalRoutes);

export default routes;
