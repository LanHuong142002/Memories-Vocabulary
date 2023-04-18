import useSWR from 'swr';

/**
 * @description function get all statuses
 *
 * @returns {Array} list statuses
 */
const getStatuses = async <T,>(): Promise<T[] | unknown> => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const status: T[] = await response.json();

    return status;
  } catch (error) {
    return error;
  }
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
