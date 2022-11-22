import mongoose, { Schema, Document } from 'mongoose'

export interface ICar extends Document {
  make: string
  model: string
  color: string
  licenseNum: string
  expDate: Date
}

const CarSchema: Schema = new Schema<ICar>({
  make: { type: String },
  model: { type: String },
  color: { type: String },
  licenseNum: { type: String },
  expDate: { type: Date },
})

export default mongoose.model<ICar>('Car', CarSchema, 'car')
