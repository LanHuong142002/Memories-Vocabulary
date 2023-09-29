import { AxiosError } from 'axios';
import { ReactNode, createContext, useCallback, useMemo, useReducer } from 'react';

// Services
import { getData, postData } from '@services';

// Constants
import { TOPIC_ACTIONS, URL } from '@constants';

// Interfaces
import { Topic } from '@interfaces';

// Stores
import { initialTopicState, topicReducer } from '@stores';

export interface TopicContextType {
  isLoadingTopic: boolean;
  errorsTopic: string;
  topics: Topic[];
  onGetTopics: () => Promise<void>;
  onAddTopic: (topic: Topic) => Promise<void>;
}

export const TopicContext = createContext<TopicContextType>({} as TopicContextType);

export function TopicProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(topicReducer, initialTopicState);
  const { isLoading: isLoadingTopic, errors: errorsTopic, topics } = state;

  /**
   * @description handles the add a new topic.
   *
   * @param {Topic} topic is the topic object to be added.
   */
  const handleAddTopic = useCallback(async (topic: Topic): Promise<void> => {
    dispatch({
      type: TOPIC_ACTIONS.ADD_REQUEST,
    });
    try {
      const response = await postData({ item: topic, endpoint: URL.TOPIC });
      dispatch({
        type: TOPIC_ACTIONS.ADD_SUCCESS,
        payload: {
          topic: response,
        },
      });
    } catch (error) {
      const { message } = error as AxiosError;
      dispatch({
        type: TOPIC_ACTIONS.ADD_FAILURE,
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
    dispatch({
      type: TOPIC_ACTIONS.GET_REQUEST,
    });
    try {
      const response = await getData<Topic>(URL.TOPIC);
      const topicsWithVocabularyCounts = response.map((topic) => ({
        ...topic,
        vocabularyCount: topic.vocabularies!.length,
      }));

      dispatch({
        type: TOPIC_ACTIONS.GET_SUCCESS,
        payload: {
          topics: topicsWithVocabularyCounts,
        },
      });
    } catch (error) {
      const { message } = error as AxiosError;
      dispatch({
        type: TOPIC_ACTIONS.GET_FAILURE,
        payload: {
          errors: message,
        },
      });
    }
  }, []);

  const value = useMemo(
    () => ({
      isLoadingTopic,
      errorsTopic,
      topics,
      onAddTopic: handleAddTopic,
      onGetTopics: getTopics,
    }),
    [isLoadingTopic, errorsTopic, topics, handleAddTopic, getTopics],
  );

  return <TopicContext.Provider value={value}>{children}</TopicContext.Provider>;
}
