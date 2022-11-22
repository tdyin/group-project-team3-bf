import mongoose, { Schema, Document } from 'mongoose'

export interface IUserInfo extends Document {
  firsName: string
  lastName: string
  middleName: string
  preferredName: string
  profilePic: string
  SSN: string
  DOB: Date
  Gender: 'Male' | 'Female' | 'I do not wish to answer.'
}

const UserInfoSchema: Schema = new Schema<IUserInfo>({
  firsName: { type: String, require: true },
  lastName: { type: String, require: true },
  middleName: { type: String },
  preferredName: { type: String },
  profilePic: {
    type: String,
    require: true,
    default: 'https://picsum.photos/id/56/300/300',
  },
  SSN: { type: String, required: true },
  DOB: { type: Date, required: true },
  Gender: { type: String, default: 'I do not wish to answer.' },
})

export default mongoose.model<IUserInfo>('UserInfo', UserInfoSchema, 'userInfo')
