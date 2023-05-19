import useSWR from 'swr';

// Constants
import { URL_API } from '@constants';

// Services
import { getProductsByParam } from '@services';

const useProduct = () => {
  const { data, error, isLoading } = useSWR(
    `${URL_API.BASE_URL}${URL_API.STATUSES}`,
    getProductsByParam,
  );

  return {
    data,
    error,
    isLoading,
  };
};

export { useProduct };
