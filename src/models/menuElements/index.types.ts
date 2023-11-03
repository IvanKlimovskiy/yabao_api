import { Document } from 'mongoose';

export interface Data extends Document {
  name: string;
  img: string;
  price: number;
  description: string;
  isNewProduct: boolean;
}
