import { IUser } from "./IUser";

export interface IFeeds {
  _id: string;
  user: IUser;
  title: string;
  description: string;
  media: string;
  createdAt: string;
}
