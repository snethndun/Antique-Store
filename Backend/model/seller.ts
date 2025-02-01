import mongoose, { Document, Schema } from 'mongoose';

export interface Seller extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  businessRegNumber: string;
  dealerBrand: string;
  timestamps: {
    createdAt: Date;
    updatedAt: Date;
  };
}

const sellerSchema = new Schema<Seller>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  businessRegNumber: {
    type: String,
    required: true,
  },
  dealerBrand: {
    type: String,
    required: true,
  },
  timestamps: {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
});

export default mongoose.model<Seller>('Seller', sellerSchema);
