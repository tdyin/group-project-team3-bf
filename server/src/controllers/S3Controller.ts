import { Request, Response } from 'express'
import { getFileSignedUrl, putFileSignedUrl } from '../utils/s3Utils'

export const getSignedDownloadUrl = async (req: Request, res: Response) => {
  try {
    const { fileName, bucket } = req.body
    const url = await getFileSignedUrl(bucket, fileName)
    res.status(200).send(url)
  } catch (error) {
    console.log(error)
  }
}


export const getSignedUploadUrl = async (req: Request, res: Response) => {
  try {
    const { fileName, bucket } = req.body

  } catch (error) {
    console.log(error)
  }
}