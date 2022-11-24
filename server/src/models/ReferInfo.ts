import mongoose, { Schema, Document } from 'mongoose'

export interface IReferInfo extends Document {
  firstName: string
  lastName: string
  middleName: string
  phone: string
  email: string
  relationship: string
}

const ReferInfoSchema: Schema = new Schema<IReferInfo>({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  middleName: { type: String },
  phone: { type: String, require: true },
  email: { type: String, require: true },
  relationship: { type: String, require: true },
})

export default mongoose.model<IReferInfo>('ReferInfo', ReferInfoSchema)
