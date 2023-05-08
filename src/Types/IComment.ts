import { IUser } from "./IUser";

export interface IComment {
  user: IUser;
  content: string;
}
