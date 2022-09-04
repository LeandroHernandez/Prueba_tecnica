import { IDocumentType } from './document-type.interface';
import { IGender } from './gender.interface';
import { IHobbie } from './hobbie.interface';
import { IPurchase } from './purchase.interface';

export interface IUser {
  _id?: string;
  documentType?: IDocumentType;
  documentNumber: string;
  names: string;
  surnames: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  address: string;
  companyWhereWork?: string;
  position?: string;
  country: string;
  city: string;
  division: string;
  community?: string;
  dateOfBirth: string;
  gender?: IGender;
  hobbies?: IHobbie[];
  shopping?: IPurchase[];
}
