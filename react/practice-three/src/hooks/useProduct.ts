import useSWR from 'swr';

// Constants
import { URL_API } from '@constants';

// Services
import { getProductsByParam } from '@services';

// Interfaces
import { Product } from '@interfaces';

interface ReturnType {
  data: Product[];
  error: string;
  isLoading: boolean;
}

export const useProduct = (): ReturnType => {
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
