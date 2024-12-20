import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  
  const result = await AuthService.loginUser(req.body);
  sendResponse(res, {
    success: true,
    message: 'User logged in successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});
const changePassword = catchAsync(async (req, res) => {
  const user=req.user
  const {...passwordData}=req.body
  const result = await AuthService.changePasswordFromBd(user,passwordData);
  console.log(req.user, req.body);
  sendResponse(res, {
    success: true,
    message: 'Password is updated successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});
export const AuthControllers = {
  loginUser,
  changePassword
};
