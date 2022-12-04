import mongoose, { Schema, Document } from 'mongoose'
import { IUser } from './User';

export interface IWorkAuthStatus extends Document {
    user: IUser['_id'],
    optReceipt: string,
    optEad: string,
    i983: string,
    i20: string,
    feedback: string,
}

const WorkAuthStatusSchema: Schema = new Schema<IWorkAuthStatus>({
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    optReceipt: { type: String },
    optEad: { type: String },
    i983: { type: String },
    i20: { type: String },
    feedback: { type: String },
})

export default mongoose.model<IWorkAuthStatus>('WorkAuthStatus', WorkAuthStatusSchema);