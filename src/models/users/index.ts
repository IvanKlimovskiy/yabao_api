import { Schema, model } from 'mongoose';
import { UserModel } from './index.types';

const UserSchema = new Schema<UserModel>({
  name: {
    type: String,
    default: 'user_me',
  },
  img: {
    type: String,
    default: 'http://localhost:8080/images/user.png',
  },
  number: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    default: 0,
  },
  email: {
    type: String,
    default: 'example@email.com',
  },
  birthdate: {
    type: String,
    default: '',
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: String,
    default: '',
  },
  activationLink: {
    type: String,
    default: '',
  },
  isSubscribed: {
    type: Boolean,
    default: true,
  },
  cart: [
    {
      _id: { type: Schema.ObjectId },
      name: { type: String },
      img: { type: String },
      price: { type: Number },
      amount: { type: Number },
      description: { type: String },
      isNewProduct: { type: Boolean },
    },
  ],
});

export default model<UserModel>('user', UserSchema);
