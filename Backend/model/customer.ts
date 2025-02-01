import mongoose, { Document, Schema } from 'mongoose';

export interface Customer extends Document {
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  mostLikePhoneBrand: string;
  timestamps: {
    createdAt: Date;
    updatedAt: Date;
  };
}

const customerSchema = new Schema<Customer>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  mostLikePhoneBrand: {
    type: String,
    required: true,
  },
  timestamps: { 
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }
});

export default mongoose.model<Customer>('Customer', customerSchema);
