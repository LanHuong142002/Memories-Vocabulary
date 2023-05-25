import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';

// Interfaces
import { Product } from '@interfaces';

// Constants
import { URL_API } from '@constants';

// Hooks
import { useProduct } from '@hooks';

// Services
import { deleteProduct, postProduct, updateProduct } from '@services';

import { mutate } from 'swr';

export interface Context {
  products: Product[];
  errorMessage: string;
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateProduct: (product: Product) => void;
  onSearchProducts: (param: string) => void;
  onUpdateErrorMessage: (message: string) => void;
}

export const ProductContext = createContext<Context>({} as Context);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [param, setParam] = useState('');
  const { data: products, error } = useProduct(param);

  /**
   * @description function set message error
   */
  const handleUpdateErrorMessage = useCallback((message: string) => {
    setErrorMessage(message);
  }, []);

  /**
   * @description get products after search
   */
  const handleSearchProducts = useCallback(async (paramSearch: string) => {
    setParam(paramSearch);
    mutate(`${URL_API.PRODUCTS_WITH_STATUS_TYPE}${param}`);
  }, []);

  /**
   * @description function add new product
   */
  const handleAddProduct = useCallback(async (product: Product) => {
    const response = await postProduct(product);

    if (typeof response === 'string') {
      setErrorMessage(response);
    } else {
      mutate(`${URL_API.PRODUCTS_WITH_STATUS_TYPE}&`);
    }
  }, []);

  /**
   * @description function delete product
   */
  const handleDeleteProduct = useCallback(async (id: string) => {
    const response = await deleteProduct(id);

    if (typeof response === 'string') {
      setErrorMessage(response);
    } else {
      mutate(`${URL_API.PRODUCTS_WITH_STATUS_TYPE}&`);
    }
  }, []);

  /**
   * @description function update product
   */
  const handleUpdateProduct = useCallback(async (product: Product) => {
    const response = await updateProduct(product);

    if (typeof response === 'string') {
      setErrorMessage(response);
    } else {
      mutate(`${URL_API.PRODUCTS_WITH_STATUS_TYPE}&`);
    }
  }, []);

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  const value = useMemo(
    () => ({
      products,
      errorMessage,
      onAddProduct: handleAddProduct,
      onDeleteProduct: handleDeleteProduct,
      onUpdateProduct: handleUpdateProduct,
      onSearchProducts: handleSearchProducts,
      onUpdateErrorMessage: handleUpdateErrorMessage,
    }),
    [
      products,
      errorMessage,
      handleAddProduct,
      handleDeleteProduct,
      handleUpdateProduct,
      handleSearchProducts,
      handleUpdateErrorMessage,
    ],
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
