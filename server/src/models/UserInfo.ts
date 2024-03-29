import mongoose, { Schema, Document } from 'mongoose'

export interface IUserInfo extends Document {
  firstName: string
  lastName: string
  middleName: string
  preferredName: string
  profilePic: string
  ssn: string
  dob: Date
  gender: 'male' | 'female' | string
}

const UserInfoSchema: Schema = new Schema<IUserInfo>({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  middleName: { type: String },
  preferredName: { type: String },
  profilePic: {
    type: String,
    require: true,
    default: 'https://picsum.photos/id/56/300/300',
  },
  ssn: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String },
})

export default mongoose.model<IUserInfo>('UserInfo', UserInfoSchema)
