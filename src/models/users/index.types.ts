import { Document } from 'mongoose';

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
}
