import { IUser } from "./IUser";
import { IComment } from "./IComment";

export interface ISession {
  user: IUser;
  title: string;
  description: string;
  date: Date;
  role: Array<string>;
  geolocation: string;
  comments: IComment[];
  genre: Array<string>;
  _id: string;
}
