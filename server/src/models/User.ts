import mongoose, { Schema, Document } from 'mongoose'
import {
  IUserInfo,
  IAddress,
  IContact,
  ICar,
  ILegal,
  IReferInfo,
  IEmeContact,
  IUserDocs,
} from './InterfacesIndex'

export interface IUser extends Document {
  username: string
  email: string
  password: string
  isHr: boolean
  userInfo: IUserInfo['_id']
  address: IAddress['_id']
  contact: IContact['_id']
  car: ICar['_id']
  legal: ILegal['_id']
  referInfo: IReferInfo['_id']
  emContact: Array<IEmeContact['_id']>
  userDocs: IUserDocs['_id']
}

const UserSchema: Schema = new Schema<IUser>({
  username: { type: String, require: true, unique: true },
  email: { type: String, required: true, unique: true, immutable: true },
  password: { type: String, require: true },
  isHr: { type: Boolean, required: true },
  userInfo: { type: Schema.Types.ObjectId, ref: 'UserInfo', required: true },
  address: { type: Schema.Types.ObjectId, ref: 'Address', required: true },
  contact: { type: Schema.Types.ObjectId, ref: 'Contact', required: true },
  car: { type: Schema.Types.ObjectId, ref: 'Car' },
  legal: { type: Schema.Types.ObjectId, ref: 'Legal', required: true },
  referInfo: { type: Schema.Types.ObjectId, ref: 'ReferInfo' },
  emContact: [
    { type: Schema.Types.ObjectId, ref: 'EmContact', required: true },
  ],
  userDocs: { type: Schema.Types.ObjectId, ref: 'UserDocs', required: true },
})

export default mongoose.model<IUser>('User', UserSchema, 'user')
