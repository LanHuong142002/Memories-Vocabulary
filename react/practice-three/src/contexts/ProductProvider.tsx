import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';

// Interfaces
import { Product } from '@interfaces';

// Constants
import { URL_API } from '@constants';

// Hooks
import { useProduct } from '@hooks';

// Services
import { deleteProduct, getProductsByParam, postProduct, updateProduct } from '@services';

import { mutate } from 'swr';

export interface Context {
  products: Product[];
  messageError: string;
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateProduct: (product: Product) => void;
  onSearchProducts: (param: string) => void;
  onSetMessageError: (message: string) => void;
}

export const ProductContext = createContext<Context>({} as Context);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [messageError, setMessageError] = useState('');
  const { data: products, error } = useProduct();

  /**
   * @description function set message error
   */
  const onSetMessageError = useCallback((message: string) => {
    setMessageError(message);
  }, []);

  /**
   * @description get products after search
   */
  const onSearchProducts = useCallback(async (param: string) => {
    const response = await getProductsByParam(param);

    if (typeof response === 'string') {
      setMessageError(response);
    } else {
      mutate(`${URL_API.BASE_URL}${URL_API.PRODUCTS}?_expand=statuses&_expand=types`);
    }
  }, []);

  /**
   * @description function add new product
   */
  const onAddProduct = useCallback(async (product: Product) => {
    const response = await postProduct(product);

    if (typeof response === 'string') {
      setMessageError(response);
    } else {
      mutate(`${URL_API.BASE_URL}${URL_API.PRODUCTS}`);
    }
  }, []);

  /**
   * @description function delete product
   */
  const onDeleteProduct = useCallback(async (id: string) => {
    const response = await deleteProduct(id);

    if (typeof response === 'string') {
      setMessageError(response);
    } else {
      mutate(`${URL_API.BASE_URL}${URL_API.PRODUCTS}`);
    }
  }, []);

  /**
   * @description function update product
   */
  const onUpdateProduct = useCallback(async (product: Product) => {
    const response = await updateProduct(product);

    if (typeof response === 'string') {
      setMessageError(response);
    } else {
      mutate(`${URL_API.BASE_URL}${URL_API.PRODUCTS}`);
    }
  }, []);

  useEffect(() => {
    setMessageError(error);
  }, [error]);

  const value = useMemo(
    () => ({
      products,
      messageError,
      onAddProduct,
      onDeleteProduct,
      onUpdateProduct,
      onSearchProducts,
      onSetMessageError,
    }),
    [
      products,
      messageError,
      onDeleteProduct,
      onUpdateProduct,
      onAddProduct,
      onSearchProducts,
      onSetMessageError,
    ],
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
