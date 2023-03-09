import { Schema, Types, model } from 'mongoose';

interface IUser {
  userId: number;
  listenedTime: number;
  // Use `Types.ObjectId` in document interface...
}

const userSchema = new Schema<IUser>({
  userId: { type: Number, required: true },
  listenedTime: { type: Number, default: 0 }
});

export default model<IUser>('User', userSchema);