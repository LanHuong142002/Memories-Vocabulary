import useSWR from 'swr';

// Constants
import { URL_API } from '@constants';

// Services
import { getProductById, getProductsByParam } from '@services';

// Interfaces
import { Product } from '@interfaces';

interface Error {
  message: string;
}

interface ReturnTypeProduct {
  data: Product[] | undefined;
  error: Error | undefined;
  isLoading: boolean;
}

interface ReturnTypeProductById {
  data: Product | undefined;
  error: Error | undefined;
  isLoading: boolean;
}

/**
 * @description Custom hook to fetch product data.
 *
 * @param {string} param Optional parameter to customize the request URL.
 *
 * @returns {Object} An object containing the product data, error, and loading state.
 */
export const useProduct = (param?: string): ReturnTypeProduct => {
  const { data, error, isLoading } = useSWR<Product[], Error | undefined>(
    `${URL_API.PRODUCTS_WITH_STATUS_TYPE}${param}`,
    getProductsByParam,
  );

  return {
    data,
    error,
    isLoading,
  };
};

/**
 * @description Custom hook to fetch product data by id.
 *
 * @param {string} id is id of product want to find
 *
 * @returns {Object} An object containing the product data, error, and loading state.
 */
export const useProductById = (id: string): ReturnTypeProductById => {
  const { data, error, isLoading } = useSWR<Product, Error | undefined>(
    `${URL_API.BASE_URL}${URL_API.PRODUCTS}/${id}`,
    getProductById,
  );

  return {
    data,
    error,
    isLoading,
  };
};
