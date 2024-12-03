import { UserServices } from './user.service';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  // console.log(req.body);

  // will call  service func to send this data
  const result = await UserServices.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    success: true,
    message: 'student is created successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});

export const userControllers = {
  createStudent,
};
