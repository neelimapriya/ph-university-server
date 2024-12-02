import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;
    console.log(req.body);

    // will call  service func to send this data
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    sendResponse(res, {
      success: true,
      message: 'student is created successfully',
      data: result,
      statusCode: StatusCodes.OK,
    });
  } catch (err) {
    next(err);
  }
};

export const userControllers = {
  createStudent,
};
