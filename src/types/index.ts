export interface User {
  name: string;
  password: string;
  loggedIn: boolean;
}

export interface RawPicture {
  id: number;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
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
};

export enum LoginMessage {
  ERROR = 'Verifique los datos ingresados',
  SUCCESS = 'Login exitoso! Ingresando...'
}
