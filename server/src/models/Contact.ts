import mongoose, { Schema, Document } from 'mongoose'

export interface IContact extends Document {
  cellPhone: string
  workPhone: string
}

const ContactSchema: Schema = new Schema<IContact>({
  cellPhone: { type: String, require: true },
  workPhone: { type: String },
})

export default mongoose.model<IContact>('Contact', ContactSchema, 'contact')
