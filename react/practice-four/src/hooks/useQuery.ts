import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// Constants
import { QUERY_KEYS, URL } from '@constants';

// Interfaces
import { Topic, Vocabulary } from '@interfaces';

// Services
import { getData } from '@services';

export const useTopics = () =>
  useQuery<Topic[], AxiosError>({
    queryKey: [QUERY_KEYS.TOPICS],
    queryFn: () => getData(URL.TOPIC),
  });

export const useVocabularies = (id: string, page?: number) =>
  useQuery<Vocabulary[], AxiosError>({
    queryKey: [QUERY_KEYS.VOCABULARIES, page, id],
    queryFn: () => getData(`${URL.TOPIC}/${id}${URL.VOCABULARY}`, page),
    enabled: !!id,
  });
