import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Services
import { deleteData, postData } from '@services';

// Interfaces
import { Topic, Vocabulary } from '@interfaces';

// Constants
import { QUERY_KEYS, URL } from '@constants';

/**
 * @description custom hook to post topic
 */
export const useMutationPostTopic = () => {
  const queryClient = useQueryClient();

  return useMutation<Omit<Topic, 'id'>, AxiosError, Omit<Topic, 'id'>>({
    mutationFn: (topic) => postData({ item: topic, endpoint: URL.TOPIC }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TOPICS] });
    },
  });
};

/**
 * @description custom hook to post vocabulary
 */
export const useMutationPostVocabulary = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<Omit<Vocabulary, 'id'>, AxiosError, Omit<Vocabulary, 'id'>>({
    mutationFn: (vocabulary) =>
      postData({ item: vocabulary, endpoint: `${URL.TOPIC}/${id}${URL.VOCABULARY}` }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.VOCABULARIES] });
    },
  });
};

/**
 * @description custom hook to delete vocabulary
 */
export const useMutationDeleteVocabulary = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<string, AxiosError, string>({
    mutationFn: (vocabularyId) =>
      deleteData({ endpoint: `${URL.TOPIC}/${id}${URL.VOCABULARY}`, id: vocabularyId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.VOCABULARIES] });
    },
  });
};
