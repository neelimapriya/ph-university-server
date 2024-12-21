import { Model } from "mongoose";
import { User_Role } from "./user.constant";

export type TUser={
    id:string;
    password:string;
    needsPasswordChange:boolean;
    role:'admin'|'student'|'faculty';
    status:'in-progress'|'blocked'
    isDeleted:boolean,
    passwordChangedAt?:Date
}

export interface UserModel extends Model<TUser>{
    isUserExistByCustomId(id:string):Promise<TUser>
     //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}
export type TUserRole = keyof typeof User_Role;