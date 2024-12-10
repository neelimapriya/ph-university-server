import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { CourseService } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseService.createCourseIntoDB(req.body);
  sendResponse(res, {
    success: true,
    message: 'Course is created successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});
const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseService.getAllCourseFromDB();
  sendResponse(res, {
    success: true,
    message: 'Courses are retrieve successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});
const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseService.getSingleCourseFromDB(id);
  sendResponse(res, {
    success: true,
    message: 'Course is retrieve successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseService.deleteCourseFromDB(id);
  sendResponse(res, {
    success: true,
    message: 'course is deleted successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});

export const CourseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
};
