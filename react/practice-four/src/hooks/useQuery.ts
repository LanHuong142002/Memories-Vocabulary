import { AxiosError } from 'axios';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

// Constants
import { QUERY_KEYS, URL } from '@constants';

// Interfaces
import { Topic, Vocabulary } from '@interfaces';

// Services
import { getData } from '@services';
import { useTopicStores } from '@stores';

/**
 * @description custom hook to get topics
 */
export const useTopics = () => {
  const { setTopics } = useTopicStores();
  return useQuery<Topic[], AxiosError>({
    queryKey: [QUERY_KEYS.TOPICS],
    queryFn: () => getData(URL.TOPIC),
    onSuccess: (data) => {
      setTopics(data);
    },
  });
};

/**
 * @description custom hook to get vocabularies
 *
 * @param {string} id is id of topic
 * @param {number} page is the number of pages out of total number of pages
 * @param {string} param is param endpoint
 */
export const useVocabularies = (id: string, enabled: boolean, page?: number, param?: string) =>
  useQuery<Vocabulary[], AxiosError>({
    queryKey: [QUERY_KEYS.VOCABULARIES, page, id, param],
    queryFn: () => getData(`${URL.TOPIC}/${id}${URL.VOCABULARY}${param || ''}`, page),
    enabled,
  });

/**
 * @description custom hook to get vocabularies with pagination
 *
 * @param {string} id is id of topic
 */
export const useInfiniteVocabularies = (id: string) =>
  useInfiniteQuery<Vocabulary[], AxiosError>({
    queryKey: [QUERY_KEYS.VOCABULARIES, id],
    queryFn: ({ pageParam = 1 }) => getData(`${URL.TOPIC}/${id}${URL.VOCABULARY}`, pageParam),
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length + 1;
      return lastPage?.length > 0 && lastPage?.length === 20 ? nextPage : undefined;
    },
  });
