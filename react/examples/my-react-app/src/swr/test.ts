import useSWR from 'swr';

const get = async <T>(url: string | URL) => {
  try {
    const response = await fetch(url);
    const responseBody = await response.json();
    const responseData = { body: responseBody, headers: response.headers };
    return responseData;
  } catch (error) {
    throw new Error(`error: ${error}`);
  }
};

const useProducts = () => {
  const { data, error, isLoading } = useSWR(`https://jsonplaceholder.typicode.com/comments`, get);

  const getProducts = (params: URLSearchParams, searchValue?: string) => {
    const url = new URL(`https://jsonplaceholder.typicode.com/comments?_page=${params}&limit=10`);
    if (searchValue) {
      url.searchParams.append('name', searchValue);
    }
  };

  const getProductById = (id: string) => {
    const {
      data: productData,
      error: productError,
      isLoading: productLoading,
    } = useSWR(`https://jsonplaceholder.typicode.com/comments?_page=${id}&limit=10`, get);
    return {
      productData,
      productError,
      productLoading,
    };
  };

  return {
    data,
    error,
    isLoading,
    getProducts,
    getProductById,
  };
};

export { useProducts };
