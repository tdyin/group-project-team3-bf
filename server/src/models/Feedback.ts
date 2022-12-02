import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IFeedback extends Document {
    user: IUser['_id'],
    feedback: string
}

const FeedbackSchema: Schema = new Schema<IFeedback>({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    feedback: { type: String }
})

export default mongoose.model<IFeedback>('Feedback', FeedbackSchema);