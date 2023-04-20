import useSWR from 'swr';
import getStatus from './statusService';

const useStatus = () => {
  const get = () => {
    const { data, error, isLoading } = useSWR(
      `https://jsonplaceholder.typicode.com/users`,
      getStatus,
    );

    return {
      data,
      error,
      isLoading,
    };
  };

  const getStatusById = (id: string) => {
    const {
      data: productData,
      error: productError,
      isLoading: productLoading,
    } = useSWR(`https://jsonplaceholder.typicode.com/users${id}`, get);
    return {
      productData,
      productError,
      productLoading,
    };
  };

  return {
    get,
    getStatusById,
  };
};

export default useStatus;
