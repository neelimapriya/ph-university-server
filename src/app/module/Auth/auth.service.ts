import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppErrors';
import { userModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import config from '../../config';
import jwt from 'jsonwebtoken'

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await userModel.isUserExistByCustomId(payload.id);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found!');
  }

  // check if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is already deleted!');
  }
  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
  }
  //checking if the password is correct

  if (!(await userModel.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched');
  }

  //create token and sent to the  client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  console.log(payload);
  return {
    accessToken,
    needsPasswordChange:user.needsPasswordChange
  };
};
export const AuthService = {
  loginUser,
};
