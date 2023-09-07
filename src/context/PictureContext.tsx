import { createContext, useState, useContext, useEffect } from 'react';
import { Picture, PictureContextType, PropsChildren } from '@/types';
import { useToast } from '@chakra-ui/react';

const initFavorites: Picture[] = [];

const PictureContext = createContext<PictureContextType>({
  addPicture: () => {},
  removePicture: () => {},
  favorites: initFavorites,
  favoriteIdsSet: new Set<string>()
});

const getInitialState = () => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : initFavorites;
};

export const PictureProvider = ({ children }: PropsChildren) => {
  const [favorites, setFavorites] = useState(getInitialState);
  const [favoriteIdsSet, setFavoriteIdsSet] = useState<Set<string>>();
  const toast = useToast();

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setFavoriteIdsSet(
      favorites.length > 0
        ? new Set(favorites.map((picture: Picture) => picture.id))
        : undefined
    );
  }, [favorites]);

  const showToast = (title: string, status: 'info' | 'success') => {
    toast({
      title,
      status,
      duration: 3000,
      isClosable: true
    });
  };

  const addPicture = (picture: Picture) => {
    if (!favorites.find((item: Picture) => item.id === picture.id)) {
      console.log('no encontro, agregar');
      setFavorites((prev: Picture[]) => [
        ...prev,
        { ...picture, favorite: true }
      ]);
      showToast('Imagen agregada a Mis favoritas', 'success');
    }
  };

  const removePicture = (pictureId: string) => {
    console.log('existe, borrar');
    if (favorites.find((item: Picture) => item.id === pictureId)) {
      setFavorites((prev: Picture[]) =>
        prev.filter((p: Picture) => p.id !== pictureId)
      );
      showToast('Imagen eliminada de Mis favoritas', 'info');
    }
  };

  return (
    <PictureContext.Provider
      value={{ addPicture, removePicture, favorites, favoriteIdsSet }}
    >
      {children}
    </PictureContext.Provider>
  );
};

export const usePictureContext = () => useContext(PictureContext);
