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
