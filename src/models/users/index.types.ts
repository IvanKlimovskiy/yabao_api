import { Document, Schema } from 'mongoose';
import { Data } from 'models/menuElements/index.types';
const { ObjectId } = Schema.Types;
export interface UserModel extends Document {
  name: string;
  img: string;
  number: string;
  code: number;
  email: string;
  birthdate: string;
  isActivated: boolean;
  refreshToken: string;
  activationLink: string;
  isSubscribed: boolean;
  cart: CartElement[];
}

export interface CartElement extends Data {
  _id: typeof ObjectId;
  amount: number;
}
