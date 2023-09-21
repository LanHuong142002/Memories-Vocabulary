import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Services
import { deleteData, postData } from '@services';

// Interfaces
import { Topic, Vocabulary } from '@interfaces';

// Constants
import { QUERY_KEYS, URL } from '@constants';

export const useMutationPostTopic = () => {
  const queryClient = useQueryClient();

  return useMutation<Topic, AxiosError, Topic>({
    mutationFn: (topic) => postData({ item: topic, endpoint: URL.TOPIC }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TOPICS] });
    },
  });
};

export const useMutationPostVocabulary = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<Vocabulary, AxiosError, Vocabulary>({
    mutationFn: (vocabulary) =>
      postData({ item: vocabulary, endpoint: `${URL.TOPIC}/${id}${URL.VOCABULARY}` }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.VOCABULARIES] });
    },
  });
};

export const useMutationDeleteVocabulary = () => {
  const queryClient = useQueryClient();

  return useMutation<string, AxiosError, string>({
    mutationFn: (id) => deleteData({ endpoint: `${URL.TOPIC}/${id}${URL.VOCABULARY}`, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.VOCABULARIES] });
    },
  });
};
