import useSWR from 'swr';
import { customErrors } from './handleErrors';

const getStatuses = async <T,>(url: string): Promise<T[] | unknown> => {
  const response = await fetch(url);
  const data: T[] = await response.json();

  if (!response.ok) {
    customErrors(response);
  }

  return data;
};

const useUser = () => {
  const { data, error, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/users`,
    getStatuses,
  );

  return {
    users: data,
    isLoading,
    isError: error,
  };
};

export { useUser, getStatuses };
