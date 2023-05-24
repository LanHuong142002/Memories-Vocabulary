import useSWR from 'swr';

// Constants
import { URL_API } from '@constants';

// Services
import { getTypes } from '@services';

// Interfaces
import { ProductType } from '@interfaces';

interface ReturnType {
  data: ProductType[];
  error: string;
  isLoading: boolean;
}

export const useType = (): ReturnType => {
  const { data, error, isLoading } = useSWR(`${URL_API.BASE_URL}${URL_API.TYPES}`, getTypes);

  return {
    data: data as ProductType[],
    error,
    isLoading,
  };
};
