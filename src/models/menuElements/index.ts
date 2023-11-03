import { Schema, model } from 'mongoose';
import { Data } from './index.types';

const generateSchema = () =>
  new Schema<Data>({
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    isNewProduct: {
      type: Boolean,
      required: true,
    },
  });

export const Pizza = model<Data>('pizza', generateSchema());
export const Roll = model<Data>('roll', generateSchema());
export const Salad = model<Data>('salad', generateSchema());
export const Drink = model<Data>('drink', generateSchema());
