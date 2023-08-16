import { AxiosError } from 'axios';
import {
  Dispatch,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

// Services
import { getData, postData } from '@services';

// Constants
import { TOPIC_ACTIONS, URL, VOCABULARY_ACTIONS } from '@constants';

// Interfaces
import { Topic, Vocabulary } from '@interfaces';

// Stores
import {
  ActionTopics,
  ActionVocabularies,
  initialTopicState,
  initialVocabularyState,
  topicReducer,
  vocabularyReducer,
} from '@stores';

interface DictionaryType {
  isLoadingTopic: boolean;
  isLoadingVocabulary: boolean;
  errorsTopic: string;
  errorsVocabulary: string;
  topics: Topic[];
  vocabularies: Vocabulary[];
  onAddTopic: (topic: Topic) => void;
  onGetVocabularies: (id: string) => void;
  topicDispatch: Dispatch<ActionTopics>;
  vocabularyDispatch: Dispatch<ActionVocabularies>;
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

  /**
   * @description handles the add a new topic.
   *
   * @param {Topic} topic is the topic object to be added.
   */
  const handleAddTopic = useCallback(
    async (topic: Topic) => {
      topicDispatch({
        type: TOPIC_ACTIONS.PENDING,
      });
      try {
        const response = await postData(topic, URL.TOPIC);
        topicDispatch({
          type: TOPIC_ACTIONS.REQUEST,
          payload: {
            topics: [...topics, response],
          },
        });
      } catch (error) {
        const { message } = error as AxiosError;
        topicDispatch({
          type: TOPIC_ACTIONS.FAILED,
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
  const handleGetVocabularies = useCallback(async (id: string) => {
    vocabularyDispatch({
      type: VOCABULARY_ACTIONS.PENDING,
    });
    try {
      const response = await getData<Vocabulary[]>(`${URL.TOPIC}/${id}${URL.VOCABULARY}`);

      vocabularyDispatch({
        type: VOCABULARY_ACTIONS.REQUEST,
        payload: {
          vocabularies: response,
        },
      });
    } catch (error) {
      const { message } = error as AxiosError;
      vocabularyDispatch({
        type: VOCABULARY_ACTIONS.FAILED,
        payload: {
          errors: message,
        },
      });
    }
  }, []);

  useEffect(() => {
    const getTopics = async () => {
      topicDispatch({
        type: TOPIC_ACTIONS.PENDING,
      });
      try {
        const response = await getData<Topic[]>(URL.TOPIC);
        topicDispatch({
          type: TOPIC_ACTIONS.REQUEST,
          payload: {
            topics: response,
          },
        });
      } catch (error) {
        const { message } = error as AxiosError;
        topicDispatch({
          type: TOPIC_ACTIONS.FAILED,
          payload: {
            errors: message,
          },
        });
      }
    };
    getTopics();
  }, []);

  const value = useMemo(
    () => ({
      isLoadingTopic,
      isLoadingVocabulary,
      errorsTopic,
      errorsVocabulary,
      topics,
      vocabularies,
      onAddTopic: handleAddTopic,
      onGetVocabularies: handleGetVocabularies,
      topicDispatch,
      vocabularyDispatch,
    }),
    [
      isLoadingTopic,
      isLoadingVocabulary,
      errorsTopic,
      errorsVocabulary,
      topics,
      vocabularies,
      handleAddTopic,
      handleGetVocabularies,
    ],
  );

  return <DictionaryContext.Provider value={value}>{children}</DictionaryContext.Provider>;
}
