import { EnumPositionUser } from "./enums";

export type UserData = {
    _id: string;
    id: string;
    fullname: string;
    username: string;
    password: string;
    position: EnumPositionUser;
    createdAt: Date;
    updatedAt: Date;
};