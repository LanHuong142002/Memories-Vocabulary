import { AxiosError } from 'axios';
import {
  Dispatch,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';

// Services
import { getData, postData } from '@services';

// Constants
import { ACTIONS_TOPIC, URL } from '@constants';

// Interfaces
import { Topic, Topic as TopicType } from '@interfaces';

// Stores
import { TopicActions, initialTopicState, topicReducer } from '@stores';

interface DictionaryType {
  isLoading: boolean;
  errorMessage: string;
  topics: TopicType[];
  onAddTopic: (topic: Topic) => void;
  topicDispatch: Dispatch<TopicActions>;
}

export const DictionaryContext = createContext<DictionaryType>({} as DictionaryType);

export function DictionaryProvider({ children }: { children: ReactNode }) {
  const [topicState, topicDispatch] = useReducer(topicReducer, initialTopicState);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddTopic = useCallback(
    async (topic: Topic) => {
      setIsLoading(true);
      try {
        const response = await postData(topic, URL.TOPIC);

        topicDispatch({
          type: ACTIONS_TOPIC.POST,
          payload: {
            topics: [...topicState.topics, response],
          },
        });
      } catch (error) {
        const { message } = error as AxiosError;
        setErrorMessage(message);
      }
      setIsLoading(false);
    },
    [topicState.topics],
  );

  useEffect(() => {
    const getTopics = async () => {
      setIsLoading(true);
      try {
        const response = await getData<TopicType[]>(URL.TOPIC);
        topicDispatch({
          type: ACTIONS_TOPIC.GET,
          payload: {
            topics: response,
          },
        });
      } catch (error) {
        const { message } = error as AxiosError;
        setErrorMessage(message);
      }
      setIsLoading(false);
    };
    getTopics();
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      errorMessage,
      topics: topicState.topics,
      onAddTopic: handleAddTopic,
      topicDispatch,
    }),
    [isLoading, errorMessage, topicState.topics, handleAddTopic, topicDispatch],
  );

  return <DictionaryContext.Provider value={value}>{children}</DictionaryContext.Provider>;
}
