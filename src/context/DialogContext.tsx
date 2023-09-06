import { createContext, useContext, useState } from 'react';
import { DialogContextType, PropsChildren } from '@/types';
import { usePictureContext } from './PictureContext';

const DialogContext = createContext<DialogContextType>({
  isDialogOpen: false,
  toggleDialog: () => {},
  executeAction: () => {},
  updatePictureId: () => {},
  pictureId: ''
});

export const DialogProvider = ({ children }: PropsChildren) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { removePicture } = usePictureContext();
  const [pictureId, setPictureId] = useState<string>('');

  const toggleDialog = () => {
    setDialogOpen(!isDialogOpen);
  };

  const executeAction = () => {
    removePicture(pictureId);
    setDialogOpen(!isDialogOpen);
  };

  const updatePictureId = (id: string) => {
    setPictureId(id);
  };

  return (
    <DialogContext.Provider
      value={{
        isDialogOpen,
        toggleDialog,
        executeAction,
        updatePictureId,
        pictureId
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialogContext = () => {
  return useContext(DialogContext);
};
