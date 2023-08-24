import { AxiosError } from 'axios';
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';

// Services
import { deleteData, getData, postData } from '@services';

// Constants
import { TOPIC_ACTIONS, URL, VOCABULARY_ACTIONS } from '@constants';

// Interfaces
import { Topic, Vocabulary, VocabularyResult } from '@interfaces';

// Stores
import {
  initialTopicState,
  initialVocabularyState,
  topicReducer,
  vocabularyReducer,
} from '@stores';

export interface DictionaryType {
  isLoadingTopic: boolean;
  isLoadingVocabulary: boolean;
  isLoading?: boolean;
  errorsTopic: string;
  errorsVocabulary: string;
  topics: Topic[];
  vocabularies: Vocabulary[];
  quizzes: VocabularyResult[];
  onGetTopic?: () => Promise<void>;
  onAddTopic: (topic: Topic) => Promise<void>;
  onAddVocabulary: (id: string, vocabulary: Vocabulary) => Promise<void>;
  onDeleteVocabulary: (topicId: string, id: string) => Promise<void>;
  onGetVocabularies: (id: string) => Promise<void>;
  onRandomQuizzes: (id: string) => void;
  onSetQuiz: (listQuiz: VocabularyResult[]) => void;
  onLoadMore?: (id: string, page: number) => Promise<number | undefined>;
}

export const DictionaryContext = createContext<DictionaryType>({} as DictionaryType);

export function DictionaryProvider({ children }: { children: ReactNode }) {
  const [topicState, topicDispatch] = useReducer(topicReducer, initialTopicState);
  const [vocabularyState, vocabularyDispatch] = useReducer(
    vocabularyReducer,
    initialVocabularyState,
  );
  const { isLoading: isLoadingTopic, errors: errorsTopic, topics } = topicState;
  const {
    isLoading: isLoadingVocabulary,
    errors: errorsVocabulary,
    vocabularies,
  } = vocabularyState;
  const [quizzes, setQuizzes] = useState<VocabularyResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLoadMore = useCallback(
    async (id: string, page: number): Promise<number | undefined> => {
      vocabularyDispatch({
        type: VOCABULARY_ACTIONS.GET_REQUEST,
      });
      try {
        const response = await getData<Vocabulary>(`${URL.TOPIC}/${id}${URL.VOCABULARY}`, page);

        vocabularyDispatch({
          type: VOCABULARY_ACTIONS.GET_SUCCESS,
          payload: {
            vocabularies: [...vocabularies, ...response],
          },
        });

        return response.length;
      } catch (error) {
        const { message } = error as AxiosError;
        vocabularyDispatch({
          type: VOCABULARY_ACTIONS.GET_FAILURE,
          payload: {
            errors: message,
          },
        });
      }
    },
    [vocabularies],
  );

  /**
   * @description function handle random array quizzes
   *
   * @param {string} id is id of topic which is selected
   */
  const handleRandomQuiz = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const response = await getData<Vocabulary>(`${URL.TOPIC}/${id}${URL.VOCABULARY}`);
      vocabularyDispatch({
        type: VOCABULARY_ACTIONS.GET_SUCCESS,
        payload: {
          vocabularies: response,
        },
      });
      setQuizzes([...response].sort(() => Math.random() - 0.5));
    } catch (error) {
      const { message } = error as AxiosError;
      vocabularyDispatch({
        type: VOCABULARY_ACTIONS.GET_FAILURE,
        payload: {
          errors: message,
        },
      });
    }
    setIsLoading(false);
  }, []);

  /**
   * @description handles the add a new topic.
   *
   * @param {Topic} topic is the topic object to be added.
   */
  const handleAddTopic = useCallback(
    async (topic: Topic): Promise<void> => {
      topicDispatch({
        type: TOPIC_ACTIONS.ADD_REQUEST,
      });
      try {
        const response = await postData(topic, URL.TOPIC);
        topicDispatch({
          type: TOPIC_ACTIONS.ADD_SUCCESS,
          payload: {
            topics: [...topics, response],
          },
        });
      } catch (error) {
        const { message } = error as AxiosError;
        topicDispatch({
          type: TOPIC_ACTIONS.ADD_FAILURE,
          payload: {
            errors: message,
          },
        });
      }
    },
    [topics],
  );

  /**
   * @description Fetches vocabularies associated with a specific topic.
   *
   * @param {string} id is the id of the topic.
   */
  const handleGetVocabularies = useCallback(async (id: string): Promise<void> => {
    vocabularyDispatch({
      type: VOCABULARY_ACTIONS.GET_REQUEST,
    });
    try {
      const response = await getData<Vocabulary>(`${URL.TOPIC}/${id}${URL.VOCABULARY}`, 1);

      vocabularyDispatch({
        type: VOCABULARY_ACTIONS.GET_SUCCESS,
        payload: {
          vocabularies: response,
        },
      });
    } catch (error) {
      const { message } = error as AxiosError;
      vocabularyDispatch({
        type: VOCABULARY_ACTIONS.GET_FAILURE,
        payload: {
          errors: message,
        },
      });
    }
  }, []);

  /**
   * @description function handles the addition of a new vocabulary for a specific topic.
   *
   * @param {string} id is the ID of the topic to which the vocabulary will be added.
   * @param {Vocabulary} vocabulary is the vocabulary object to be added.
   */
  const handleAddVocabulary = useCallback(
    async (id: string, vocabulary: Vocabulary): Promise<void> => {
      vocabularyDispatch({
        type: VOCABULARY_ACTIONS.ADD_REQUEST,
      });
      try {
        const response = await postData<Vocabulary>(
          vocabulary,
          `${URL.TOPIC}/${id}${URL.VOCABULARY}`,
        );

        vocabularyDispatch({
          type: VOCABULARY_ACTIONS.ADD_SUCCESS,
          payload: {
            vocabularies: [...vocabularies, response],
          },
        });
      } catch (error) {
        const { message } = error as AxiosError;
        vocabularyDispatch({
          type: VOCABULARY_ACTIONS.ADD_FAILURE,
          payload: {
            errors: message,
          },
        });
      }
    },
    [vocabularies],
  );

  /**
   * @description function handles the deletion of a vocabulary from a specific topic.
   *
   * @param {string} topicId is the ID of the topic from which the vocabulary will be deleted.
   * @param {string} id is the ID of the vocabulary to be deleted.
   */
  const handleDeleteVocabulary = useCallback(async (topicId: string, id: string): Promise<void> => {
    vocabularyDispatch({
      type: VOCABULARY_ACTIONS.DELETE_REQUEST,
    });
    try {
      await deleteData<Vocabulary>(`${URL.TOPIC}/${topicId}${URL.VOCABULARY}`, id);

      vocabularyDispatch({
        type: VOCABULARY_ACTIONS.DELETE_SUCCESS,
        payload: {
          vocabularyId: id,
        },
      });
    } catch (error) {
      const { message } = error as AxiosError;
      vocabularyDispatch({
        type: VOCABULARY_ACTIONS.DELETE_FAILURE,
        payload: {
          errors: message,
        },
      });
    }
  }, []);

  /**
   * @description function get topics
   */
  const getTopics = useCallback(async () => {
    topicDispatch({
      type: TOPIC_ACTIONS.GET_REQUEST,
    });
    try {
      const response = await getData<Topic>(URL.TOPIC);
      topicDispatch({
        type: TOPIC_ACTIONS.GET_SUCCESS,
        payload: {
          topics: response,
        },
      });
    } catch (error) {
      const { message } = error as AxiosError;
      topicDispatch({
        type: TOPIC_ACTIONS.GET_FAILURE,
        payload: {
          errors: message,
        },
      });
    }
  }, []);

  useEffect(() => {
    getTopics();
  }, [getTopics]);

  const value = useMemo(
    () => ({
      isLoading,
      isLoadingTopic,
      isLoadingVocabulary,
      errorsTopic,
      errorsVocabulary,
      topics,
      vocabularies,
      quizzes,
      onAddTopic: handleAddTopic,
      onAddVocabulary: handleAddVocabulary,
      onGetVocabularies: handleGetVocabularies,
      onDeleteVocabulary: handleDeleteVocabulary,
      onRandomQuizzes: handleRandomQuiz,
      onSetQuiz: setQuizzes,
      onGetTopic: getTopics,
      onLoadMore: handleLoadMore,
    }),
    [
      isLoading,
      isLoadingTopic,
      isLoadingVocabulary,
      errorsTopic,
      errorsVocabulary,
      topics,
      vocabularies,
      quizzes,
      handleAddTopic,
      handleAddVocabulary,
      handleGetVocabularies,
      handleDeleteVocabulary,
      handleRandomQuiz,
      getTopics,
      handleLoadMore,
    ],
  );

  return <DictionaryContext.Provider value={value}>{children}</DictionaryContext.Provider>;
}
