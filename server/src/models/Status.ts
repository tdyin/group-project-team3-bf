import mongoose, { Schema, Document } from 'mongoose'

export interface IStatus extends Document {
    email: string;
    name: string;
    link: string;
    status: boolean;
}

const StatusSchema: Schema = new Schema<IStatus>({
    email: { type: String, require: true },
    name: { type: String, require: true },
    link: { type: String, require: true },
    status: { type: Boolean, require: true, default: false }
})

export default mongoose.model<IStatus>('Status', StatusSchema);