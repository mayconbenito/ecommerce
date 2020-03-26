import mongoose, { Document, Schema } from 'mongoose';

enum status {
  'cancelled',
  'refused',
  'processing',
  'finished',
}

export type OrderType = {
  user: string;
  products: [
    {
      _id: string;
      name: string;
      price: number;
      description: string;
      informations: string;
      quantity: number;
      totalPrice: number;
    },
  ];
  payment: {
    status: string;
    cardFirstDigits: number;
    cardLastDigits: number;
    cardHolderName: string;
    cardExpirationDate: string;
    cardBrand: string;
    pagamerId: number;
  };
  totalOrderAmount: number;
  status: status;
};

type SchemaType = Document & OrderType;

const schema = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      _id: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      description: { type: String },
      informations: { type: String },
      quantity: { type: Number },
      totalPrice: { type: Number },
    },
  ],
  payment: {
    status: {
      type: String,
      enum: ['paid', 'processing', 'refused', 'error_processing_payment'],
    },
    cardFirstDigits: { type: String, required: true },
    cardLastDigits: { type: String, required: true },
    cardHolderName: { type: String, required: true },
    cardExpirationDate: { type: String, required: true },
    cardBrand: {
      type: String,
      required: true,
    },
    customerDocument: {
      type: String,
    },
    pagarmeId: {
      type: Number,
    },
  },
  totalOrderAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['cancelled', 'refused', 'processing', 'finished', 'error'],
  },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<SchemaType>('Order', schema);
