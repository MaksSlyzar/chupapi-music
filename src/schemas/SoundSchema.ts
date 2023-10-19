import { Schema, Types, model } from 'mongoose';

interface ISound {
  link: string,
  addedBy: { type: Schema.Types.ObjectId, ref: "User" },
  date: number
  // Use `Types.ObjectId` in document interface...
}

const soundSchema = new Schema<ISound>({
  link: { type: String, required: true },
  addedBy: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Number, required: false }
});

export default model<ISound>('Sound', soundSchema);