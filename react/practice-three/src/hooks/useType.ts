import useSWR from 'swr';

// Constants
import { URL_API } from '@constants';

// Services
import { getTypes } from '@services';

// Interfaces
import { ProductType } from '@interfaces';

interface Error {
  message: string;
}

interface ReturnType {
  data: ProductType[] | undefined;
  error: Error | undefined;
  isLoading: boolean;
}

export const useType = (): ReturnType => {
  const { data, error, isLoading } = useSWR<ProductType[], Error | undefined>(
    `${URL_API.BASE_URL}${URL_API.TYPES}`,
    getTypes,
  );

  return {
    data,
    error,
    isLoading,
  };
};
