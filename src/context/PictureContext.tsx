import { createContext, useState, useContext, useEffect } from 'react';
import { Picture, PropsChildren } from '@/types';

const PictureContext = createContext<any>({});

const initPictures = {
  pictures: [],
};
const getInitialState = () => {
  const pictures = localStorage.getItem("pictures");
  return pictures ? JSON.parse(pictures) : initPictures;
};

export const PictureProvider = ({ children }: PropsChildren) => {
  const [pictures, setPictures] = useState(getInitialState);

  useEffect(() => {
    localStorage.setItem("pictures", JSON.stringify(pictures));
  }, [pictures]);

  const addPicture = (picture: Picture) =>
  // deberia chequear si el id no esta aca
  setPictures((prev: any) => ({
      ...prev,
      pictures: [...prev.pictures, {...picture, favorite: true}],
    }));

  const removePicture = (pictureId: string) =>
  setPictures((prev: any) => ({
      ...prev,
      pictures: prev.pictures.filter((p: Picture) => p.id !== pictureId),
    }));

  return (
    <PictureContext.Provider value={{ addPicture, removePicture, ...pictures }}>
      {children}
    </PictureContext.Provider>
  );
};

export const usePictureContext = () => useContext(PictureContext);
