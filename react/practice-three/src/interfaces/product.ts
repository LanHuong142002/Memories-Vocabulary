import { ProductStatus, ProductType } from '@interfaces';

export interface Product {
  price: number;
  quantity: number;
  id: string;
  image: string;
  name: string;
  status?: string;
  type?: string;
  brandImage: string;
  brand: string;
  statusesId?: string;
  typesId?: string;
  statuses?: ProductStatus;
  types?: ProductType;
}
