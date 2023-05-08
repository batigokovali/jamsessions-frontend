export interface IUser {
  username: string;
  email: string;
  avatar: string;
  savedsessions: Array<string>;
  createdsessions: Array<string>;
  location: Location;
  role: Array<string>;
  refreshToken: string;
}
