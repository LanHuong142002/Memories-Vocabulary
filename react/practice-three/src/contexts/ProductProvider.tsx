import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { mutate } from 'swr';

// Interfaces
import { Product } from '@interfaces';

// Constants
import { URL_API } from '@constants';

// Hooks
import { useProduct } from '@hooks';

// Services
import { deleteProduct, postProduct, updateProduct } from '@services';

export interface ProductContextType {
  isLoading?: boolean;
  errorMessage: string;
  products?: Product[];
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateProduct: (product: Product) => void;
  onSearchProducts: (param: string) => void;
  onUpdateErrorMessage: (message: string) => void;
}

export const ProductContext = createContext<ProductContextType>({} as ProductContextType);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [param, setParam] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: products, error, isLoading: isLoadingProducts } = useProduct(param);

  /**
   * @description function set message error
   */
  const handleUpdateErrorMessage = useCallback((message: string): void => {
    setErrorMessage(message);
  }, []);

  /**
   * @description get products after search
   */
  const handleSearchProducts = useCallback(
    (paramSearch: string): void => {
      setParam(paramSearch);
      mutate(`${URL_API.PRODUCTS_WITH_STATUS_TYPE}${param}`);
    },
    [param],
  );

  /**
   * @description function add new product
   */
  const handleAddProduct = useCallback(async (product: Product): Promise<void> => {
    setIsLoading(true);
    const response = await postProduct(product);
    setIsLoading(false);

    if (typeof response === 'string') {
      setErrorMessage(response);
    } else {
      mutate(`${URL_API.PRODUCTS_WITH_STATUS_TYPE}&`);
    }
  }, []);

  /**
   * @description function delete product
   */
  const handleDeleteProduct = useCallback(async (id: string): Promise<void> => {
    setIsLoading(true);
    const response = await deleteProduct(id);
    setIsLoading(false);

    if (typeof response === 'string') {
      setErrorMessage(response);
    } else {
      mutate(`${URL_API.PRODUCTS_WITH_STATUS_TYPE}&`);
    }
  }, []);

  /**
   * @description function update product
   */
  const handleUpdateProduct = useCallback(async (product: Product): Promise<void> => {
    setIsLoading(true);
    const response = await updateProduct(product);
    setIsLoading(false);

    if (typeof response === 'string') {
      setErrorMessage(response);
    } else {
      mutate(`${URL_API.PRODUCTS_WITH_STATUS_TYPE}&`);
    }
  }, []);

  useEffect(() => {
    if (error) {
      setErrorMessage(error.message);
    }

    setIsLoading(isLoadingProducts);
  }, [error, isLoadingProducts]);

  const value = useMemo(
    () => ({
      isLoading,
      products,
      errorMessage,
      onAddProduct: handleAddProduct,
      onDeleteProduct: handleDeleteProduct,
      onUpdateProduct: handleUpdateProduct,
      onSearchProducts: handleSearchProducts,
      onUpdateErrorMessage: handleUpdateErrorMessage,
    }),
    [
      isLoading,
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
