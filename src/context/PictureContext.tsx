import { createContext, useState, useContext, useEffect } from 'react';
import { Picture, PictureContextType, PropsChildren } from '@/types';
import { useToast } from '@chakra-ui/react';

const initFavorites: Picture[] = [];

const PictureContext = createContext<PictureContextType>({
  favorites: initFavorites,
  id: '',
  addPicture: () => {},
  removePicture: () => {},
  updateId: () => {}
});

const getInitialState = () => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : initFavorites;
};

export const PictureProvider = ({ children }: PropsChildren) => {
  const toast = useToast();
  const [favorites, setFavorites] = useState(getInitialState);
  const [id, setId] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const updateId = (id: string) => {
    setId(id);
  };

  const showToast = (title: string, status: 'info' | 'success') => {
    toast({
      title,
      status,
      duration: 3000,
      isClosable: true
    });
  };

  const addPicture = (picture: Picture) => {
    setFavorites((prev: Picture[]) => [
      ...prev,
      { ...picture, favorite: true }
    ]);
    showToast('Imagen agregada a Mis favoritas', 'success');
  };

  const removePicture = (pictureId: string) => {
    setFavorites((prev: Picture[]) =>
      prev.filter((p: Picture) => p.id !== pictureId)
    );
    showToast('Imagen eliminada de Mis favoritas', 'info');
  };

  return (
    <PictureContext.Provider
      value={{ addPicture, removePicture, favorites, updateId, id }}
    >
      {children}
    </PictureContext.Provider>
  );
};

export const usePictureContext = () => useContext(PictureContext);
