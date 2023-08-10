import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { AxiosError } from 'axios';

// Services
import { getData, postData } from '@services';

// Constants
import { URL } from '@constants';

// Interfaces
import { Topic, Topic as TopicType } from '@interfaces';

interface DictionaryType {
  isLoading: boolean;
  topics: TopicType[];
  errorMessage: string;
  onAddTopic: (topic: Topic) => void;
}

export const DictionaryContext = createContext<DictionaryType>({} as DictionaryType);

export function DictionaryProvider({ children }: { children: ReactNode }) {
  const [topics, setTopics] = useState<TopicType[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddTopic = useCallback(async (topic: Topic) => {
    setIsLoading(true);
    try {
      const response = await postData(topic, URL.TOPIC);

      setTopics((prev) => [...prev, response]);
    } catch (error) {
      const { message } = error as AxiosError;
      setErrorMessage(message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const getTopics = async () => {
      setIsLoading(true);
      try {
        const response = await getData<TopicType[]>(URL.TOPIC);
        setTopics(response);
      } catch (error) {
        const { message } = error as AxiosError;
        setErrorMessage(message);
      }
      setIsLoading(false);
    };
    getTopics();
  }, []);

  const value = useMemo(
    () => ({ isLoading, topics, errorMessage, onAddTopic: handleAddTopic }),
    [isLoading, topics, errorMessage, handleAddTopic],
  );

  return <DictionaryContext.Provider value={value}>{children}</DictionaryContext.Provider>;
}
