import { SelectItemProps } from '@components';

interface Product {
  id?: string;
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
  statuses?: SelectItemProps;
  types?: SelectItemProps;
}

export default Product;
