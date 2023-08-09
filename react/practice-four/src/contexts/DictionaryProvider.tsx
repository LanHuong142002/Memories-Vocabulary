import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { Topic, Topic as TopicType } from '@interfaces';
import { getData, postData } from '@services';
import { URL } from '@constants';

interface DictionaryType {
  isLoading: boolean;
  topics: TopicType[];
  errorMessage: string;
  onAddNewTopic: (topic: Topic) => void;
}

export const DictionaryContext = createContext<DictionaryType>({} as DictionaryType);

export function DictionaryProvider({ children }: { children: ReactNode }) {
  const [topics, setTopics] = useState<TopicType[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddNewTopic = useCallback(async (topic: Topic) => {
    setIsLoading(true);
    try {
      const response = await postData(topic, URL.TOPIC);

      setTopics((prev) => [...prev, response]);
    } catch (error) {
      const { message } = error as Error;
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
        const { message } = error as Error;
        setErrorMessage(message);
      }
      setIsLoading(false);
    };
    getTopics();
  }, []);

  const value = useMemo(
    () => ({ isLoading, topics, errorMessage, onAddNewTopic: handleAddNewTopic }),
    [isLoading, topics, errorMessage, handleAddNewTopic],
  );

  return <DictionaryContext.Provider value={value}>{children}</DictionaryContext.Provider>;
}
