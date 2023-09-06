import { createContext, useState, useContext, useEffect } from 'react';
import { Picture, PictureContextType, PropsChildren } from '@/types';

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
  const [favoriteIdsSet, setFavoriteIdsSet] = useState<Set<String>>();

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setFavoriteIdsSet(
      favorites.length > 0
        ? new Set(favorites.map((picture: Picture) => picture.id))
        : undefined
    );
  }, [favorites]);

  const addPicture = (picture: Picture) =>
    setFavorites((prev: Picture[]) => [
      ...prev,
      { ...picture, favorite: true }
    ]);

  const removePicture = (pictureId: string) =>
    setFavorites((prev: Picture[]) =>
      prev.filter((p: Picture) => p.id !== pictureId)
    );

  return (
    <PictureContext.Provider
      value={{ addPicture, removePicture, favorites, favoriteIdsSet }}
    >
      {children}
    </PictureContext.Provider>
  );
};

export const usePictureContext = () => useContext(PictureContext);
