import { create } from 'zustand';

// Interfaces
import { Vocabulary, VocabularyResult } from '@interfaces';

interface StoresType {
  vocabularies: Vocabulary[];
  quizzes: VocabularyResult[];
  setVocabularies: (data: Vocabulary[]) => void;
  setQuizzes: (data: Vocabulary[]) => void;
  onAddVocabularies: (data: Vocabulary) => void;
  onDeleteVocabularies: (id: string) => void;
  onRandomQuizzes: (data: Vocabulary[]) => void;
}

export const useVocabulariesStores = create<StoresType>((set, get) => ({
  vocabularies: [],
  quizzes: [],
  setVocabularies: (data: Vocabulary[]) => set(() => ({ vocabularies: data })),
  setQuizzes: (data: Vocabulary[]) => set(() => ({ quizzes: data })),
  onAddVocabularies: (data: Vocabulary) =>
    set(() => ({ vocabularies: [...get().vocabularies, data] })),
  onDeleteVocabularies: (id: string) =>
    set(() => ({
      vocabularies: get().vocabularies.filter((vocab) => vocab.id !== id),
    })),
  onRandomQuizzes: (data: Vocabulary[]) =>
    set(() => ({ quizzes: [...data].sort(() => Math.random() - 0.5) })),
}));
