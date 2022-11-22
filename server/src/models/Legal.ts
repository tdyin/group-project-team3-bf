import mongoose, { Schema, Document } from 'mongoose'

export interface ILegal extends Document {
  permanent: boolean
  permanentType: 'Green Card' | 'Citizen'
  visaTitle: 'H1-B' | 'L2' | 'F1(CPT/OPT)' | 'H4' | string
  startDate: Date
  endDate: Date
}

const LegalSchema: Schema = new Schema<ILegal>({
  permanent: { type: Boolean },
  permanentType: { type: String },
  visaTitle: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
})

export default mongoose.model<ILegal>('Legal', LegalSchema, 'legal')
