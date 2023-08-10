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
  dispatch: Dispatch<TopicActions>;
}

export const DictionaryContext = createContext<DictionaryType>({} as DictionaryType);

export function DictionaryProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(topicReducer, initialTopicState);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddTopic = useCallback(
    async (topic: Topic) => {
      setIsLoading(true);
      try {
        const response = await postData(topic, URL.TOPIC);

        dispatch({
          type: ACTIONS_TOPIC.POST,
          payload: {
            topics: [...state.topics, response],
          },
        });
      } catch (error) {
        const { message } = error as AxiosError;
        setErrorMessage(message);
      }
      setIsLoading(false);
    },
    [state.topics],
  );

  useEffect(() => {
    const getTopics = async () => {
      setIsLoading(true);
      try {
        const response = await getData<TopicType[]>(URL.TOPIC);
        dispatch({
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
    () => ({ isLoading, errorMessage, topics: state.topics, onAddTopic: handleAddTopic, dispatch }),
    [isLoading, errorMessage, state.topics, handleAddTopic, dispatch],
  );

  return <DictionaryContext.Provider value={value}>{children}</DictionaryContext.Provider>;
}
