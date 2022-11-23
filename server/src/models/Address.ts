import mongoose, { Schema, Document } from 'mongoose'

export interface IAddress extends Document {
  bldgApt: string
  street: string
  city: string
  state: string
  zip: string
}

const AddressSchema: Schema = new Schema<IAddress>({
  bldgApt: { type: String },
  street: { type: String, require: true },
  city: { type: String, require: true },
  state: { type: String, require: true },
  zip: { type: String, require: true },
})

export default mongoose.model<IAddress>('Address', AddressSchema, 'address')
