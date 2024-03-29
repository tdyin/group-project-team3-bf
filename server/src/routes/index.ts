import { Router } from 'express';
import userRoutes from './UserRoutes'
import personalRoutes from './PersonalInfoRoutes'
import s3Routes from './S3Routes';
import applicationRoutes from './ApplicationsRoutes';
import hrRoutes from './HRRoutes';

const routes = Router();

routes.use(userRoutes);
routes.use(personalRoutes);
routes.use(hrRoutes);

routes.use(s3Routes)
routes.use(applicationRoutes)

export default routes;
