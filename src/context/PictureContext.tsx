import { createContext, useState, useContext, useEffect } from 'react';
import { Picture, PictureContextType, PropsChildren } from '@/types';
import { useToast } from '@chakra-ui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPicture } from '@/api';

const initFavorites: Picture[] = [];

// const PictureContext = createContext<PictureContextType>({
//   addPicture: () => {},
//   removePicture: () => {},
//   favorites: initFavorites,
//   favoriteIdsSet: new Set<string>(),
//   updateId: () => {},
//   id: ''
// });

const PictureContext = createContext<any>({

});

const getInitialState = () => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : initFavorites;
};

export const PictureProvider = ({ children }: PropsChildren) => {
  const toast = useToast();
  const [favorites, setFavorites] = useState(getInitialState);
  const [favoriteIdsSet, setFavoriteIdsSet] = useState<Set<string>>();
  const [id, setId] = useState<string>('');
  const queryClient = useQueryClient();
  
  const { data, error, isLoading, isError } = useQuery(['imageDetail', id], () =>
    getPicture(Number(id))
  );

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

  const addPicture = (picture: Picture) => {
    if (!favoriteIdsSet?.has(id)) {
      setFavorites((prev: Picture[]) => [
        ...prev,
        { ...picture, favorite: true }
      ]);
      queryClient.setQueryData(['imageDetail', id], {...data, favorite: true});
      showToast('Imagen agregada a Mis favoritas', 'success');
    }
  };

  const removePicture = (pictureId: string) => {
    if (favoriteIdsSet?.has(id)) {
      setFavorites((prev: Picture[]) =>
        prev.filter((p: Picture) => p.id !== pictureId)
      );
      queryClient.setQueryData(['imageDetail', id], {...data, favorite: false});
      showToast('Imagen eliminada de Mis favoritas', 'info');
    }
  };

  return (
    <PictureContext.Provider
      value={{ addPicture, removePicture, favorites, favoriteIdsSet, updateId, id, data, error, isError,isLoading }}
    >
      {children}
    </PictureContext.Provider>
  );
};

export const usePictureContext = () => useContext(PictureContext);
