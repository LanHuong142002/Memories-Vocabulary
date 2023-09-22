import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';

// Constants
import { QUERY_KEYS, URL } from '@constants';

// Interfaces
import { Topic, Vocabulary } from '@interfaces';

// Services
import { getData } from '@services';

/**
 * @description custom hook to get topics
 */
export const useTopics = () =>
  useQuery<Topic[], AxiosError>({
    queryKey: [QUERY_KEYS.TOPICS],
    queryFn: () => getData(URL.TOPIC),
  });

/**
 * @description custom hook to get vocabularies
 */
export const useVocabularies = (id: string, page?: number) =>
  useQuery<Vocabulary[], AxiosError>({
    queryKey: [QUERY_KEYS.VOCABULARIES, page, id],
    queryFn: () => getData(`${URL.TOPIC}/${id}${URL.VOCABULARY}`, page),
    enabled: !!id,
  });
