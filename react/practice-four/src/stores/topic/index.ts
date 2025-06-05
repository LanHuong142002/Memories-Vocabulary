import { create } from 'zustand';

// Interfaces
import { Topic } from '@interfaces';

interface StoresType {
  topics: Topic[];
  setTopics: (value: Topic[]) => void;
  addTopics: (value: Topic) => void;
}

export const useTopicStores = create<StoresType>((set, get) => ({
  topics: [],
  setTopics: (data: Topic[]) => set(() => ({ topics: data })),
  addTopics: (value: Topic) => set(() => ({ topics: [...get().topics, value] })),
}));
