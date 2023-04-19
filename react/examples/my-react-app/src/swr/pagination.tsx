import { useMemo, useState } from 'react';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { customErrors } from './handleErrors';

interface Comments {
  id: string;
  name: string;
}

const getCommments = async (url: string): Promise<Comments[]> => {
  const response = await fetch(url);
  const data: Comments[] = await response.json();

  if (!response.ok) {
    customErrors(response, data);
  }

  return data;
};

const Page = ({ index }: { index: number }) => {
  const { data, error } = useSWR<Comments[]>(
    `https://jsonplaceholder.typicode.com/comments?_page=${index}&limit=10`,
    getCommments,
  );

  return (
    <>
      {error && <div>{error.message}</div>}
      <div>{Array.isArray(data) && data!.map((item) => <div key={item.id}>{item.name}</div>)}</div>
    </>
  );
};

const PaginationButton = () => {
  const [pageIndex, setPageIndex] = useState(0);

  return (
    <div>
      <Page index={pageIndex} />
      <div style={{ display: 'none' }}>
        <Page index={pageIndex + 1} />
      </div>
      <button onClick={() => setPageIndex(pageIndex - 1)}>Previous</button>
      <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
    </div>
  );
};

const PaginationLoadMore = () => {
  const [count, setCount] = useState(1);

  const pages = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= count; i++) {
      pages.push(<Page index={i} key={i} />);
    }
    return pages;
  }, [count]);

  return (
    <div>
      {pages}
      <button onClick={() => setCount(count + 1)}>Load More</button>
    </div>
  );
};

// useSWRInfinite
// Pagination cursor based

const PAGE_SIZE = 10;

const getKey = (pageIndex: number, previousPageData: Comments[] | null) => {
  if (previousPageData && !previousPageData.length) return null; // reached the end
  const cursor = previousPageData ? previousPageData[previousPageData.length - 1].id : '';
  return `https://jsonplaceholder.typicode.com/comments?_limit=${PAGE_SIZE}&_sort=id&_order=desc&_start=${cursor}`;
};

const PageInfinite = () => {
  const { data, error, size, setSize } = useSWRInfinite<
    Comments[],
    { message: string; status: number }
  >(getKey, getCommments);

  const comments = (data ? data.flat() : []) as Comments[];
  const totalComments = data ? data.reduce((acc, comments) => acc + comments.length, 0) : 0;
  const totalPages = Math.ceil(totalComments / PAGE_SIZE);

  if (error) return <div>Error</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <p>total page: {totalPages}</p>
      {Array.isArray(comments) &&
        comments.map((comment) => <div key={comment.id}>{comment.name}</div>)}
      <button onClick={() => setSize(size + 1)}>Load more</button>
    </div>
  );
};

export { PaginationButton, PaginationLoadMore, PageInfinite };
