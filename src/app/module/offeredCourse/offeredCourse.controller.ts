import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { offeredCourseService } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await offeredCourseService.createOfferedCourseIntoDb(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Offered course is created successfully',
    data: result,
  });
});
const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await offeredCourseService.updateOfferedCourseIntoDB(
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Offered course is created successfully',
    data: result,
  });
});
const getOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await offeredCourseService.createOfferedCourseIntoDb(
    req.query,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Offered course is retrieve successfully',
    meta: result.meta,
    data: result,
  });
});

const getSingleOfferedCourses = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await offeredCourseService.getSingleOfferedCourseFromDB(id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'OfferedCourse fetched successfully',
      data: result,
    });
  },
);

const getMyOfferedCourses = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const result = await offeredCourseService.getMyOfferedCoursesFromDB(userId);
console.log(result);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Offered Courses retrieved successfully !',
    // meta: result.meta,
    data: result,
  });
});

export const offeredCourseController = {
  createOfferedCourse,
  getOfferedCourse,
  updateOfferedCourse,
  getMyOfferedCourses,
  getSingleOfferedCourses,
};
