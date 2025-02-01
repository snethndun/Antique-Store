import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  role: string;
  timestamps: {
    createdAt: Date;
    updatedAt: Date;
  };
}

const userSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  timestamps: {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
});

export default mongoose.model<User>('User', userSchema);
