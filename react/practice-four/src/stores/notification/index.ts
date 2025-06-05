import { create } from 'zustand';

export interface StoresType {
  notification: boolean;
  messageError: string;
  setNotification: (value: boolean) => void;
  setMessageError: (message: string) => void;
}

export const useNotificationStores = create<StoresType>((set) => ({
  notification: false,
  messageError: '',
  setNotification: (value: boolean) => set(() => ({ notification: value })),
  setMessageError: (message: string) => set(() => ({ messageError: message })),
}));
