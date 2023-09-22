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
    mutationFn: (topic) => postData({ item: topic, endpoint: 'asdasdasdasdasd' }),
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
export const useMutationDeleteVocabulary = () => {
  const queryClient = useQueryClient();

  return useMutation<string, AxiosError, string>({
    mutationFn: (id) => deleteData({ endpoint: `${URL.TOPIC}/${id}${URL.VOCABULARY}`, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.VOCABULARIES] });
    },
  });
};
