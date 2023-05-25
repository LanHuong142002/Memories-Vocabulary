import { ProductStatus, ProductType } from '@interfaces';

interface Product {
  id: string;
  image: string;
  name: string;
  status?: string;
  price: number | string;
  type?: string;
  quantity: number | string;
  brandImage: string;
  brand: string;
  statusesId?: string;
  typesId?: string;
  statuses?: ProductStatus;
  types?: ProductType;
}

export default Product;
