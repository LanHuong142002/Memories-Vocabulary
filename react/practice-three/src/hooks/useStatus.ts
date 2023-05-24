import useSWR from 'swr';

// Constants
import { URL_API } from '@constants';

// Services
import { getStatuses } from '@services';

// Interfaces
import { ProductStatus } from '@interfaces';

interface ReturnType {
  data: ProductStatus[];
  error: string;
  isLoading: boolean;
}

export const useStatus = (): ReturnType => {
  const { data, error, isLoading } = useSWR(`${URL_API.BASE_URL}${URL_API.STATUSES}`, getStatuses);

  return {
    data: data as ProductStatus[],
    error,
    isLoading,
  };
};
