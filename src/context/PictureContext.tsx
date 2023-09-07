import { createContext, useState, useContext, useEffect } from 'react';
import { Picture, PictureContextType, PropsChildren } from '@/types';
import { useToast } from '@chakra-ui/react';

const initFavorites: Picture[] = [];

const PictureContext = createContext<PictureContextType>({
  addPicture: () => {},
  removePicture: () => {},
  favorites: initFavorites,
  favoriteIdsSet: new Set<string>(),
  updateId: () => {},
  id: ''
});

const getInitialState = () => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : initFavorites;
};

export const PictureProvider = ({ children }: PropsChildren) => {
  const [favorites, setFavorites] = useState(getInitialState);
  const [favoriteIdsSet, setFavoriteIdsSet] = useState<Set<string>>();
  const [id, setId] = useState<string>('');
  
  const toast = useToast();

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setFavoriteIdsSet(
      favorites.length > 0
        ? new Set(favorites.map((picture: Picture) => picture.id))
        : undefined
    );
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


  const findImage = (pictureId: string) =>{
    return favorites.find((item: Picture) => item.id === pictureId)
  }

  const addPicture = (picture: Picture) => {
    if (!findImage(picture.id)) {
      setFavorites((prev: Picture[]) => [
        ...prev,
        { ...picture, favorite: true }
      ]);
      showToast('Imagen agregada a Mis favoritas', 'success');
    }
  };

  const removePicture = (pictureId: string) => {
    if (findImage(pictureId)) {
      setFavorites((prev: Picture[]) =>
        prev.filter((p: Picture) => p.id !== pictureId)
      );
      showToast('Imagen eliminada de Mis favoritas', 'info');
    }
  };

  return (
    <PictureContext.Provider
      value={{ addPicture, removePicture, favorites, favoriteIdsSet, updateId, id }}
    >
      {children}
    </PictureContext.Provider>
  );
};

export const usePictureContext = () => useContext(PictureContext);
