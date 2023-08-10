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
import { TOPIC_ACTIONS, URL } from '@constants';

// Interfaces
import { Topic } from '@interfaces';

// Stores
import { ActionTopics, initialTopicState, topicReducer } from '@stores';

interface DictionaryType {
  isLoadingTopic: boolean;
  errorsTopic: string;
  topics: Topic[];
  onAddTopic: (topic: Topic) => void;
  topicDispatch: Dispatch<ActionTopics>;
}

export const DictionaryContext = createContext<DictionaryType>({} as DictionaryType);

export function DictionaryProvider({ children }: { children: ReactNode }) {
  const [topicState, topicDispatch] = useReducer(topicReducer, initialTopicState);
  const { isLoading: isLoadingTopic, errors: errorsTopic, topics } = topicState;

  const handleAddTopic = useCallback(
    async (topic: Topic) => {
      topicDispatch({
        type: TOPIC_ACTIONS.PENDING,
      });
      try {
        const response = await postData(topic, URL.TOPIC);
        topicDispatch({
          type: TOPIC_ACTIONS.POST,
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

  useEffect(() => {
    const getTopics = async () => {
      topicDispatch({
        type: TOPIC_ACTIONS.PENDING,
      });
      try {
        const response = await getData<Topic[]>(URL.TOPIC);
        topicDispatch({
          type: TOPIC_ACTIONS.GET,
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
      errorsTopic,
      topics: topics,
      onAddTopic: handleAddTopic,
      topicDispatch,
    }),
    [isLoadingTopic, errorsTopic, topics, handleAddTopic],
  );

  return <DictionaryContext.Provider value={value}>{children}</DictionaryContext.Provider>;
}
