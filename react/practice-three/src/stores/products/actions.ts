// Constants
import { ACTIONS } from '@constants';

// Interfaces
import { Product } from '@interfaces';

export type GetProducts = {
  type: ACTIONS.GET_PRODUCTS;
  payload: Product[];
};

export type addProduct = {
  type: ACTIONS.ADD_PRODUCT;
  payload: Product;
};

export type DeleteProduct = {
  type: ACTIONS.DELETE_PRODUCT;
  payload: string;
};

export type UpdateProduct = {
  type: ACTIONS.UPDATE_PRODUCT;
  payload: Product;
};

export type ProductActions = GetProducts | DeleteProduct | UpdateProduct | addProduct;
