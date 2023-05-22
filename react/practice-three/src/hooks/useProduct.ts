import useSWR from 'swr';

// Constants
import { URL_API } from '@constants';

// Services
import { getProductsByParam } from '@services';

const useProduct = (param: string) => {
  const { data, error, isLoading } = useSWR(
    `${URL_API.BASE_URL}${URL_API.PRODUCTS}?_expand=statuses&_expand=types${param}`,
    getProductsByParam,
  );

  return {
    data,
    error,
    isLoading,
  };
};

export { useProduct };
