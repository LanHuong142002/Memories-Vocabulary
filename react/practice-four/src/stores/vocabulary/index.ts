import { create } from 'zustand';

// Interfaces
import { Vocabulary, VocabularyResult } from '@interfaces';

interface StoresType {
  vocabularies: Vocabulary[];
  quizzes: VocabularyResult[];
  onSetVocabularies: (data: Vocabulary[]) => void;
  onSetQuizzes: (data: Vocabulary[]) => void;
  onAddVocabularies: (data: Vocabulary) => void;
  onDeleteVocabularies: (id: string) => void;
  onRandomQuizzes: (data: Vocabulary[]) => void;
}

export const useVocabulariesStores = create<StoresType>((set, get) => ({
  vocabularies: [],
  quizzes: [],
  onSetVocabularies: (data: Vocabulary[]) => set(() => ({ vocabularies: data })),
  onSetQuizzes: (data: Vocabulary[]) => set(() => ({ quizzes: data })),
  onAddVocabularies: (data: Vocabulary) =>
    set(() => ({ vocabularies: [...get().vocabularies, data] })),
  onDeleteVocabularies: (id: string) =>
    set(() => ({
      vocabularies: get().vocabularies.filter((vocab) => vocab.id !== id),
    })),
  onRandomQuizzes: (data: Vocabulary[]) =>
    set(() => ({ quizzes: [...data].sort(() => Math.random() - 0.5) })),
}));
