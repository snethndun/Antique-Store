import mongoose, { Document, Schema } from 'mongoose';

export interface Order extends Document {
  quantity: number;
  orderNumber: string;
  buyerId: string;
  productId: mongoose.Types.ObjectId;
  status: string;
  paymentStatus: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<Order>(
  {
    quantity: {
      type: Number,
      required: true,
    },
    orderNumber: {
      type: String,
      unique: true,
      required: true,
    },
    buyerId: {
      type: String,
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product', 
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Order>('Order', orderSchema);
