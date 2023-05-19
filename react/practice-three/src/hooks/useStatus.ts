import useSWR from 'swr';

// Constants
import { URL_API } from '@constants';

// Services
import { getStatuses } from '@services';

const useStatus = () => {
  const { data, error, isLoading } = useSWR(`${URL_API.BASE_URL}${URL_API.STATUSES}`, getStatuses);

  return {
    data,
    error,
    isLoading,
  };
};

export { useStatus };
