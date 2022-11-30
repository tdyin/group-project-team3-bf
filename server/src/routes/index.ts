import { Router } from 'express';
import userRoutes from './UserRoutes'
import personalRoutes from './PersonalInfoRoutes'
import s3Routes from './S3Routes';

const routes = Router();

routes.use(userRoutes);
routes.use(personalRoutes);

routes.use(s3Routes)

export default routes;
