import mongoose, { Schema, Document } from 'mongoose'

export interface IEmeContact extends Document {
  firstName: string
  lastName: string
  middleName: string
  phone: string
  email: string
  relationship: string
}

const EmContactSchema: Schema = new Schema<IEmeContact>({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  middleName: { type: String },
  phone: { type: String, require: true },
  email: { type: String, require: true },
  relationship: { type: String, require: true },
})

export default mongoose.model<IEmeContact>('EmContact', EmContactSchema)
