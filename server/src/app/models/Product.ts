import mongoose, { Document, Schema } from 'mongoose';

export type ProductType = {
  id?: string;
  title?: string;
  unit_price?: string;
  name?: string;
  price?: number;
  description?: string;
  informations?: string;
  quantity?: number;
  tangible?: boolean;
};

type SchemaType = Document & ProductType;

const schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  informations: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<SchemaType>('Product', schema);
