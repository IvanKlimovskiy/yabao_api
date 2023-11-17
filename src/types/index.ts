export interface ErrorStatusCode extends Error {
  statusCode: number;
}

export interface NameField {
  name: string;
}
export interface EmailField {
  email: string;
}
export interface BirthdateField {
  birthdate: string;
}
interface NumberField {
  number: string;
}
interface ImgField {
  img: string;
}

export type ProfileFields = NameField | EmailField | BirthdateField | NumberField | ImgField;
