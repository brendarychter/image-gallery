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
  id: number;
  author: string;
  downloadUrl: string;
}

export interface PropsChildren {
  children?: React.ReactNode;
}

export type UserContextType = {
  user: User;
  updateUser: (prop: string, value: string | boolean) => void;
};

export enum LoginMessage {
  ERROR = 'Error. Check the data',
  SUCCESS = 'Login successful! Redirecting to home...'
}