import mongoose, { Schema, Document } from 'mongoose';

export interface IPatient extends Document {
  name: string;
  age: number;
  gender: string;
  createdAt: Date;
  updatedAt: Date;
}

const PatientSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IPatient>('Patient', PatientSchema);