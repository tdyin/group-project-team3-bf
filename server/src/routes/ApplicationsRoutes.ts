import { Router } from 'express'
import { updateApplicaiton } from '../controllers/ApplicationController'

const applicationRoutes = Router()

applicationRoutes.put('/application', updateApplicaiton)

export default applicationRoutes
