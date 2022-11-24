import mongoose, { Schema, Document } from 'mongoose'

export interface IUserDocs extends Document {
  driverlicense: string
  workAuth: string
}

const UserDocsSchema: Schema = new Schema<IUserDocs>({
  driverlicense: { type: String },
  workAuth: { type: String },
})

export default mongoose.model<IUserDocs>('UserDocs', UserDocsSchema)
