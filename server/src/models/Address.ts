import mongoose, { Schema, Document } from 'mongoose'

export interface IAddress extends Document {
  bldApt: string
  streetName: string
  city: string
  state: string
  zip: string
}

const AddressSchema: Schema = new Schema<IAddress>({
  bldApt: { type: String },
  streetName: { type: String, require: true },
  city: { type: String, require: true },
  state: { type: String, require: true },
  zip: { type: String, require: true },
})

export default mongoose.model<IAddress>('Address', AddressSchema, 'address')
