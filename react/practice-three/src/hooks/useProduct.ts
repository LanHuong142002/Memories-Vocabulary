import useSWR from 'swr';

// Constants
import { URL_API } from '@constants';

// Services
import { getProductById, getProductsByParam } from '@services';

// Interfaces
import { Product } from '@interfaces';

interface ReturnTypeProduct {
  data: Product[];
  error: string;
  isLoading: boolean;
}

interface ReturnTypeProductById {
  data: Product;
  error: string;
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
  const { data, error, isLoading } = useSWR(
    `${URL_API.BASE_URL}${URL_API.PRODUCTS}?_expand=statuses&_expand=types${param}`,
    getProductsByParam,
  );

  return {
    data: data as Product[],
    error,
    isLoading,
  };
};

/**
 * @description Custom hook to fetch product data by id.
 *
 * @param {string} param Optional parameter to customize the request URL.
 *
 * @returns {Object} An object containing the product data, error, and loading state.
 */
export const useProductById = (id: string): ReturnTypeProductById => {
  const { data, error, isLoading } = useSWR(
    `${URL_API.BASE_URL}${URL_API.PRODUCTS}/${id}`,
    getProductById,
  );

  return {
    data: data as Product,
    error,
    isLoading,
  };
};
