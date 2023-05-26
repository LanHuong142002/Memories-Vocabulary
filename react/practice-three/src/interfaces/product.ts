import { ProductStatus, ProductType } from '@interfaces';

export interface Product {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  brandImage: string;
  brand: string;
  statuses?: ProductStatus;
  statusesId?: string;
  types?: ProductType;
  typesId?: string;
}
