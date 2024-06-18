import { UserData } from './user.type';

export type LoginValues = {
  username: string;
  password: string;
};

export type ResponseLogin = {
  access_token: string;
  user: UserData;
};