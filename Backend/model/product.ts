import mongoose, { Document, Schema } from 'mongoose';

interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

interface ProductData {
  productName: string;
  productPrice: string;
  productQuantity: string;
  productCondition: string;
  productImage: string;
  status: string;
  timestamps: Timestamps;
}

// Define the schema for the Product model
interface ProductModel extends ProductData, Document {}

const ProductSchema = new Schema<ProductModel>({
  productName: { type: String, required: true },
  productPrice: { type: String, required: true },
  productQuantity: { type: String, required: true },
  productCondition: { type: String, required: true },
  productImage: { type: String, required: true },
  status: { type: String, default: 'available' },
  timestamps: {
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
  },
});

// Create and export the Product model
const Product = mongoose.model<ProductModel>('Product', ProductSchema);

export default Product;
