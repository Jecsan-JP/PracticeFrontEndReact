import { useCallback } from "react";

export const useDialog = (dialogId: string) => {
  const showModal = useCallback(() => {
    const dialog = document.getElementById(
      dialogId
    ) as HTMLDialogElement | null;
    dialog?.showModal();
  }, [dialogId]);

  const closeModal = useCallback(() => {
    const dialog = document.getElementById(
      dialogId
    ) as HTMLDialogElement | null;
    dialog?.close();
  }, [dialogId]);

  return { showModal, closeModal };
};
