// src/hooks/useWaitlist.ts
import { useCallback } from 'react';

let openWaitlistModal: (() => void) | null = null;

export const useWaitlist = () => {
  const setOpenModal = useCallback((callback: () => void) => {
    openWaitlistModal = callback;
  }, []);

  const openModal = useCallback(() => {
    if (openWaitlistModal) {
      openWaitlistModal();
    }
  }, []);

  return { setOpenModal, openModal };
};