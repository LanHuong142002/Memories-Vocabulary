import { AxiosError } from 'axios';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

// Constants
import { QUERY_KEYS, URL } from '@constants';

// Interfaces
import { Topic, Vocabulary } from '@interfaces';

// Services
import { getData } from '@services';

// Stores
import { useNotificationStores, useTopicStores, useVocabulariesStores } from '@stores';

/**
 * @description custom hook to get topics
 */
export const useTopics = () => {
  const { setTopics } = useTopicStores();
  const { setMessageError } = useNotificationStores();

  return useQuery<Topic[], AxiosError>({
    queryKey: [QUERY_KEYS.TOPICS],
    queryFn: () => getData(URL.TOPIC),
    onSuccess: (data) => setTopics(data),
    onError: (error) => setMessageError(error.message),
  });
};

/**
 * @description custom hook to get vocabularies
 *
 * @param {string} id is id of topic
 * @param {number} page is the number of pages out of total number of pages
 * @param {string} param is param endpoint
 */
export const useVocabularies = ({
  id = '',
  enabled,
  page,
  param = '',
}: {
  id?: string;
  enabled: boolean;
  page?: number;
  param?: string;
}) => {
  const { setMessageError } = useNotificationStores();
  const { setVocabularies } = useVocabulariesStores();

  return useQuery<Vocabulary[], AxiosError>({
    queryKey: [QUERY_KEYS.VOCABULARIES, page, id, param, param],
    queryFn: () => getData(`${URL.TOPIC}/${id}${URL.VOCABULARY}${param}`, page),
    onSuccess: (data) => setVocabularies(data),
    onError: (error) => setMessageError(error.message),
    enabled,
  });
};

/**
 * @description custom hook to get vocabularies with pagination
 *
 * @param {string} id is id of topic
 */
export const useInfiniteVocabularies = (id: string = '') =>
  useInfiniteQuery<Vocabulary[], AxiosError>({
    queryKey: [QUERY_KEYS.VOCABULARIES, id],
    queryFn: ({ pageParam = 1 }) => getData(`${URL.TOPIC}/${id}${URL.VOCABULARY}`, pageParam),
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length + 1;
      return lastPage?.length > 0 && lastPage?.length === 20 ? nextPage : undefined;
    },
  });
