import { Router } from 'express'
import {
  getSignedDownloadUrl,
  getSignedUploadUrl,
} from '../controllers/S3Controller'

const s3Routes = Router()

s3Routes.get('/download', getSignedDownloadUrl)
s3Routes.get('/upload', getSignedUploadUrl)

export default s3Routes
