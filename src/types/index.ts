export interface User {
  id: number;
  name: string;
  password: string;
}

export interface Picture {
  id: number;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}
