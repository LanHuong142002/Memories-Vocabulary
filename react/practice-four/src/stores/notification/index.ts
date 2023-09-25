import { create } from 'zustand';

interface StoresType {
  notification: boolean;
  messageError: string;
  setNotification: (value: boolean) => void;
  setMessageError: (message: string) => void;
}

export const useNotificationStores = create<StoresType>((set, get) => ({
  notification: false,
  messageError: '',
  setNotification: (value: boolean) => set(() => ({ notification: !!get().messageError || value })),
  setMessageError: (message: string) => set(() => ({ messageError: message })),
}));
