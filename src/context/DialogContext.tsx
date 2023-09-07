import { createContext, useContext, useState } from 'react';
import { DialogContextType, PropsChildren } from '@/types';

const DialogContext = createContext<DialogContextType>({
  isDialogOpen: false,
  toggleDialog: () => {},
});

export const DialogProvider = ({ children }: PropsChildren) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const toggleDialog = () => {
    setDialogOpen(!isDialogOpen);
  };

  return (
    <DialogContext.Provider
      value={{
        isDialogOpen,
        toggleDialog,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialogContext = () => {
  return useContext(DialogContext);
};
