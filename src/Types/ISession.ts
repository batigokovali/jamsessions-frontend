import { IUser } from "./IUser";
import { IComment } from "./IComment";
import { ILocation } from "./ILocation";

export interface ISession {
  user: IUser;
  title: string;
  description: string;
  date: Date;
  role: Array<string>;
  location: ILocation;
  comments: IComment[];
  genre: Array<string>;
  _id: string;
}
