import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';

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

    // send response
    res.status(200).json({
      success: true,
      message: 'Student data created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err) {
    next(err);
  }
};

export const userControllers = {
  createStudent,
};
