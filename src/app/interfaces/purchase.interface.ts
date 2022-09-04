import { IProduct } from './product.interface';
// import { IUser } from './user.interface';

export interface IPurchase {
  _id?: string;
  // client?: IUser;
  // selectedProduct?: IProduct;
  selectedProduct: IProduct;
  total: number;
  amount: number;
}
