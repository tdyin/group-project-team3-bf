import { Request, Response } from 'express'
import mongoose, { Schema, Document } from 'mongoose'

export interface ITest extends Document {
  data: string
}

const TestSchema: Schema = new Schema<ITest>({
  data: { type: String },
})

const Test = mongoose.model<ITest>('Test', TestSchema, 'test')

export const getTest = async (req: Request, res: Response) => {
  try {
    const test = await Test.findOne({})

    if (!test) {
      res.status(400).json({ msg: 'Not found' })
      return
    }

    res.status(200).json(test)
  } catch (error) {
    console.log(error)
  }
}
