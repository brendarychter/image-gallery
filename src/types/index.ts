export interface User {
  name: string;
  password: string;
  loggedIn: boolean;
}

export interface Picture {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
  favorite: boolean;
  thumbnail: string;
}

export interface Pictures {
  pictures: Picture[];
}
export interface PropsChildren {
  children?: React.ReactNode;
}

export type UserContextType = {
  user: User;
  updateUser: (prop: string, value: string | boolean) => void;
  clearStorage: () => void;
};

export type PictureContextType = {
  id: string;
  favorites: Picture[];
  addPicture: (prop: Picture)=> void;
  removePicture: (prop: string) => void;
  updateId: (prop: string) => void;
};

export type DialogContextType = {
  isDialogOpen: boolean;
  toggleDialog: () => void;
};

export enum LoginMessage {
  ERROR = 'Verifique los datos ingresados',
  SUCCESS = 'Login exitoso! Ingresando...'
}
