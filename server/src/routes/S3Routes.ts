import { Router } from 'express'
import {
  getSignedDownloadUrl,
  getSignedUploadUrl,
} from '../controllers/S3Controller'

const s3Routes = Router()

s3Routes.post('/s3/download', getSignedDownloadUrl)
s3Routes.post('/s3/upload', getSignedUploadUrl)

export default s3Routes
