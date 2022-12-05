import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { GetObjectCommand, PutObjectAclCommand } from '@aws-sdk/client-s3'
import client from '../config/s3Client'

type Bucket = 'bf-t3-bucket' | 'bf-t3-test-bucket'

export async function getFileSignedUrl(bucket: Bucket, fileName: string) {
  const command = new GetObjectCommand({ Bucket: bucket, Key: fileName })
  return await getSignedUrl(client, command, { expiresIn: 3600 })
}

export async function putFileSignedUrl(bucket: Bucket, fileName: string) {
  const command = new PutObjectAclCommand({ Bucket: bucket, Key: fileName })
  return await getSignedUrl(client, command, { expiresIn: 3600 })
}
