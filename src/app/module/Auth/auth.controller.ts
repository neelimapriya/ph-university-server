import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { AuthService } from './auth.service';
import config from '../../config';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);
  const { refreshToken, accessToken, needsPasswordChange } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.Node_env === 'production',
    httpOnly: true,
    sameSite: 'none', //front-end and backend api alada tai none
    maxAge: 1000 * 60 * 60 * 24 * 365, //cookie expire duration
  });
  sendResponse(res, {
    success: true,
    message: 'User logged in successfully',
    data: {
      accessToken,
      needsPasswordChange,
    },
    statusCode: StatusCodes.OK,
  });
});
const changePassword = catchAsync(async (req, res) => {
  const user = req.user;
  const { ...passwordData } = req.body;
  const result = await AuthService.changePasswordFromBd(user, passwordData);
  sendResponse(res, {
    success: true,
    message: 'Password is updated successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  sendResponse(res, {
    success: true,
    message: 'Access token is retrieve successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});
const forgetPassword = catchAsync(async (req, res) => {
  const userId = req.body.id;
  const result = await AuthService.forgetPassword(userId);

  sendResponse(res, {
    success: true,
    message: 'Reset link is generated successfully ',
    data: result,
    statusCode: StatusCodes.OK,
  });
});
const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await AuthService.resetPassword(req.body, token as string);

  sendResponse(res, {
    success: true,
    message: 'Password reset successfully ',
    data: result,
    statusCode: StatusCodes.OK,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
