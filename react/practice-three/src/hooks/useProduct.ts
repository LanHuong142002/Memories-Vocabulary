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

export const useProduct = (): ReturnTypeProduct => {
  const { data, error, isLoading } = useSWR(
    `${URL_API.BASE_URL}${URL_API.PRODUCTS}?_expand=statuses&_expand=types`,
    getProductsByParam,
  );

  return {
    data: data as Product[],
    error,
    isLoading,
  };
};

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
