import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { Topic, Topic as TopicType, Vocabulary } from '@interfaces';
import { getData, postData } from '@services';
import { URL } from '@constants';

interface DictionaryType {
  isLoading: boolean;
  errorMessage: string;
  topics: TopicType[];
  vocabularies: Vocabulary[];
  onAddNewTopic: (topic: Topic) => void;
  onOpenTopic: (id: string) => void;
}

export const DictionaryContext = createContext<DictionaryType>({} as DictionaryType);

export function DictionaryProvider({ children }: { children: ReactNode }) {
  const [topics, setTopics] = useState<TopicType[]>([]);
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
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

  const handleOpenTopic = useCallback(
    (id: string) => {
      const topic = topics.find((topic) => topic.id === id);
      setVocabularies(topic!.vocabularies!);
    },
    [topics],
  );

  console.log(vocabularies);

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
    () => ({
      isLoading,
      errorMessage,
      topics,
      vocabularies,
      onAddNewTopic: handleAddNewTopic,
      onOpenTopic: handleOpenTopic,
    }),
    [isLoading, errorMessage, vocabularies, topics, handleAddNewTopic, handleOpenTopic],
  );

  return <DictionaryContext.Provider value={value}>{children}</DictionaryContext.Provider>;
}
