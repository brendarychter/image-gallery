export interface User {
  name: string;
  password: string;
  loggedIn: boolean;
}

export interface Picture {
  id: number;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export interface PropsChildren {
  children?: React.ReactNode;
}

export type UserContextType = {
  user: User;
  updateUser: (prop: string, value: string | boolean) => void;
};
