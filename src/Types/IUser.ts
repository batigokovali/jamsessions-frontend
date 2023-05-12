import { ISession } from "./ISession";

export interface IUser {
  username: string;
  email: string;
  avatar: string;
  savedSessions: ISession[];
  createdSessions: ISession[];
  location: Location;
  role: Array<string>;
  refreshToken: string;
  _id: string;
}
