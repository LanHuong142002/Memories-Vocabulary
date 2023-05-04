import { customErrors } from 'swr/handleErrors';

const getStatus = async <T>(url: string): Promise<T[] | unknown> => {
  const response = await fetch(url);
  const data: T[] = await response.json();

  if (!response.ok) {
    customErrors(response);
  }

  return data;
};

export default getStatus;
