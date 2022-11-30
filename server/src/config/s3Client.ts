import { S3Client } from '@aws-sdk/client-s3'
import dotenv from 'dotenv'
dotenv.config()

const config = {
  region: 'us-west-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
}

const client = new S3Client(config)

export default client
