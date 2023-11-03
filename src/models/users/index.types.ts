import { Document } from 'mongoose';

export interface UserModel extends Document {
  name: string;
  img: string;
  number: string;
  code: number;
}
