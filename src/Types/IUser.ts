import { ISession } from "./ISession";
import { ILocation } from "./ILocation";

export interface IUser {
  username: string;
  email: string;
  avatar: string;
  savedSessions: ISession[];
  createdSessions: ISession[];
  location: ILocation;
  role: Array<string>;
  refreshToken: string;
  _id: string;
}
