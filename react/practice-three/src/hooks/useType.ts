import useSWR from 'swr';

// Constants
import { URL_API } from '@constants';

// Services
import { getTypes } from '@services';

export const useType = () => {
  const { data, error, isLoading } = useSWR(`${URL_API.BASE_URL}${URL_API.TYPES}`, getTypes);

  return {
    data,
    error,
    isLoading,
  };
};
