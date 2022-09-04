export interface IProductCategorie {
  id?: string;
  name: string;
  description?: string;
  subcategories?: IProductCategorie[];
}
