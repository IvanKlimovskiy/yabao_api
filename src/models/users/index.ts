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
});

export default model<UserModel>('user', UserSchema);
