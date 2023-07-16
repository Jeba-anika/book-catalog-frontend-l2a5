export interface IUser {
  email: string;
  role: string;
  _id: number;
}
export interface IBook {
  _id?: number;
  title: string;
  genre: string;
  author: string;
  publicationDate: string;
  owner: IUser | string | null;
}

export interface IBookInput {
  title: string;
  genre: string;
  publicationDate: string;
  author: string;
}
