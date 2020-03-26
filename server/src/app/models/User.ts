import mongoose, { Document, Schema } from 'mongoose';

export type CartType = {
  products: string[];
  totalPrice: number;
};

export type UserType = Document & {
  name: string;
  email: string;
  password: string;
  document: number;
  birthday: Date;
  phones: string[];
  sessionToken: string;
  cart: CartType;
};

type SchemaType = Document & UserType;

const schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, select: false },
  password: { type: String, required: true, select: false },
  document: { type: String, select: false },
  birthday: { type: Date, required: true },
  phones: [{ type: String }],
  sessionToken: {
    type: String,
  },
  cart: {
    products: [
      {
        _id: {
          type: mongoose.Types.ObjectId,
          ref: 'Product',
        },
        quantity: { type: Number, required: true },
      },
    ],
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
  },
  createdAt: { type: Date, default: Date.now },
});

// Reset user cart when finish order
export default mongoose.model<SchemaType>('User', schema);
