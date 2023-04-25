import useSWR from 'swr';
import getStatus from './statusService';

const useStatus = () => {
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

const useStatusById = (id: string) => {
  const {
    data: productData,
    error: productError,
    isLoading: productLoading,
  } = useSWR(`https://jsonplaceholder.typicode.com/users${id}`, getStatus);

  return {
    productData,
    productError,
    productLoading,
  };
};

export { useStatus, useStatusById };
