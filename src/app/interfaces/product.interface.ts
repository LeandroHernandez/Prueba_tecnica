import { IProductCategorie } from './product-categorie.interface';

export interface IProduct {
  _id?: string;
  name: string;
  description?: string;
  price: number;
  categories?: IProductCategorie[];
  amount: number;
}
