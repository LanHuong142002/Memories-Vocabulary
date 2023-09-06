import { AxiosError } from 'axios';
import { ReactNode, createContext, useCallback, useMemo, useReducer, useState } from 'react';

// Services
import { deleteData, getData, postData } from '@services';

// Constants
import { URL, VOCABULARY_ACTIONS } from '@constants';

// Interfaces
import { Vocabulary, VocabularyResult } from '@interfaces';

// Stores
import { initialVocabularyState, vocabularyReducer } from '@stores';

export interface VocabularyContextType {
  isLoadingVocabularies: boolean;
  isLoadingMore: boolean;
  isAdding: boolean;
  isLoadingQuizzes?: boolean;
  errorsVocabulary: string;
  deletingById: {
    [id: string]: boolean;
  };
  vocabularies: Vocabulary[];
  quizzes: VocabularyResult[];
  onAddVocabulary: (id: string, vocabulary: Vocabulary) => Promise<void>;
  onDeleteVocabulary: (topicId: string, id: string) => Promise<void>;
  onGetVocabularies: (id: string) => Promise<void>;
  onRandomQuizzes: (id: string) => void;
  onSetQuiz: (listQuiz: VocabularyResult[]) => void;
  onLoadMore: (id: string, page: number) => Promise<number | undefined>;
  onCheckEnglishIsExisted: (id: string, valueENG: string) => Promise<boolean | undefined>;
}

export const VocabularyContext = createContext<VocabularyContextType>({} as VocabularyContextType);

export function VocabularyProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(vocabularyReducer, initialVocabularyState);
  const {
    isAdding,
    deletingById,
    isLoadingMore,
    isLoading: isLoadingVocabularies,
    errors: errorsVocabulary,
    vocabularies,
  } = state;
  const [quizzes, setQuizzes] = useState<VocabularyResult[]>([]);
  const [isLoadingQuizzes, setIsLoadingQuizzes] = useState<boolean>(false);

  const handleLoadMore = useCallback(
    async (id: string, page: number): Promise<number | undefined> => {
      dispatch({
        type: VOCABULARY_ACTIONS.GET_MORE_REQUEST,
      });
      try {
        const response = await getData<Vocabulary>(`${URL.TOPIC}/${id}${URL.VOCABULARY}`, page);

        dispatch({
          type: VOCABULARY_ACTIONS.GET_MORE_SUCCESS,
          payload: {
            vocabularies: response,
          },
        });

        return response.length;
      } catch (error) {
        const { message } = error as AxiosError;
        dispatch({
          type: VOCABULARY_ACTIONS.GET_FAILURE,
          payload: {
            errors: message,
          },
        });
      }
    },
    [],
  );

  /**
   * @description function handle random array quizzes
   *
   * @param {string} id is id of topic which is selected
   */
  const handleRandomQuiz = useCallback(async (id: string) => {
    setIsLoadingQuizzes(true);
    try {
      const response = await getData<Vocabulary>(`${URL.TOPIC}/${id}${URL.VOCABULARY}`);

      setQuizzes([...response].sort(() => Math.random() - 0.5));
    } catch (error) {
      const { message } = error as AxiosError;
      dispatch({
        type: VOCABULARY_ACTIONS.GET_FAILURE,
        payload: {
          errors: message,
        },
      });
    }
    setIsLoadingQuizzes(false);
  }, []);

  /**
   * @description Fetches vocabularies associated with a specific topic.
   *
   * @param {string} id is the id of the topic.
   */
  const handleGetVocabularies = useCallback(async (id: string): Promise<void> => {
    dispatch({
      type: VOCABULARY_ACTIONS.GET_REQUEST,
    });
    try {
      const response = await getData<Vocabulary>(`${URL.TOPIC}/${id}${URL.VOCABULARY}`, 1);

      dispatch({
        type: VOCABULARY_ACTIONS.GET_SUCCESS,
        payload: {
          vocabularies: response,
        },
      });
    } catch (error) {
      const { message } = error as AxiosError;
      dispatch({
        type: VOCABULARY_ACTIONS.GET_FAILURE,
        payload: {
          errors: message,
        },
      });
    }
  }, []);

  const handleCheckExistedVocabulary = useCallback(async (id: string, valueENG: string) => {
    try {
      const response = await getData<Vocabulary>(
        `${URL.TOPIC}/${id}${URL.VOCABULARY}?english=${valueENG}`,
      );

      return response.length > 0;
    } catch (error) {
      const { message } = error as AxiosError;
      dispatch({
        type: VOCABULARY_ACTIONS.ADD_FAILURE,
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
      dispatch({
        type: VOCABULARY_ACTIONS.ADD_REQUEST,
      });
      try {
        const response = await postData<Vocabulary>(
          vocabulary,
          `${URL.TOPIC}/${id}${URL.VOCABULARY}`,
        );

        dispatch({
          type: VOCABULARY_ACTIONS.ADD_SUCCESS,
          payload: {
            vocabulary: response,
          },
        });
      } catch (error) {
        const { message } = error as AxiosError;
        dispatch({
          type: VOCABULARY_ACTIONS.ADD_FAILURE,
          payload: {
            errors: message,
          },
        });
      }
    },
    [],
  );

  /**
   * @description function handles the deletion of a vocabulary from a specific topic.
   *
   * @param {string} topicId is the ID of the topic from which the vocabulary will be deleted.
   * @param {string} id is the ID of the vocabulary to be deleted.
   */
  const handleDeleteVocabulary = useCallback(async (topicId: string, id: string): Promise<void> => {
    dispatch({
      type: VOCABULARY_ACTIONS.DELETE_REQUEST,
      payload: {
        vocabularyId: id,
      },
    });
    try {
      await deleteData<Vocabulary>(`${URL.TOPIC}/${topicId}${URL.VOCABULARY}`, id);

      dispatch({
        type: VOCABULARY_ACTIONS.DELETE_SUCCESS,
        payload: {
          vocabularyId: id,
        },
      });
    } catch (error) {
      const { message } = error as AxiosError;
      dispatch({
        type: VOCABULARY_ACTIONS.DELETE_FAILURE,
        payload: {
          errors: message,
          vocabularyId: id,
        },
      });
    }
  }, []);

  const value = useMemo(
    () => ({
      isLoadingVocabularies,
      isAdding,
      deletingById,
      isLoadingMore,
      isLoadingQuizzes,
      errorsVocabulary,
      vocabularies,
      quizzes,
      onAddVocabulary: handleAddVocabulary,
      onGetVocabularies: handleGetVocabularies,
      onDeleteVocabulary: handleDeleteVocabulary,
      onRandomQuizzes: handleRandomQuiz,
      onSetQuiz: setQuizzes,
      onLoadMore: handleLoadMore,
      onCheckEnglishIsExisted: handleCheckExistedVocabulary,
    }),
    [
      isLoadingVocabularies,
      isAdding,
      deletingById,
      isLoadingMore,
      isLoadingQuizzes,
      errorsVocabulary,
      vocabularies,
      quizzes,
      handleAddVocabulary,
      handleGetVocabularies,
      handleDeleteVocabulary,
      handleLoadMore,
      handleRandomQuiz,
      handleCheckExistedVocabulary,
    ],
  );

  return <VocabularyContext.Provider value={value}>{children}</VocabularyContext.Provider>;
}
