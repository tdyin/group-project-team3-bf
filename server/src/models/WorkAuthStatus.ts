import mongoose, { Schema, Document } from 'mongoose'

export interface IWorkAuthStatus extends Document {
    optReceipt: string;
    optEad: string;
    i983: string;
    i20: string;
    feedback: string;
}

const WorkAuthStatusSchema: Schema = new Schema<IWorkAuthStatus>({
    optReceipt: { type: String },
    optEad: { type: String },
    i983: { type: String },
    i20: { type: String },
    feedback: { type: String },
})

export default mongoose.model<IWorkAuthStatus>('WorkAuthStatus', WorkAuthStatusSchema);