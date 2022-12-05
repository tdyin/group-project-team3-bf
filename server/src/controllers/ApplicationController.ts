import { Request, Response } from 'express'
import User from '../models/User'

export const updateApplicaiton = async (req: Request, res: Response) => {
  try {
    const {
      personalInfo,
      address,
      contact,
      car,
      legal,
      referInfo,
      emeContact,
    } = req.body.formData

    console.log(address);
    

    res.status(200).send('success')
  } catch (error) {
    console.log(error)
  }
}
