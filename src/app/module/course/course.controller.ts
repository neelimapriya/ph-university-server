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
  const result = await CourseService.getAllCourseFromDB(req.query);
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
const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseService.updateCourseFromDB(id,req.body);
  sendResponse(res, {
    success: true,
    message: 'course is updated successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});




const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseService.assignFacultiesWithCourseIntoDB(courseId,faculties);
  sendResponse(res, {
    success: true,
    message: 'Faculty is assign successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});

const removeFacultiesFromCourse=catchAsync(async(req,res)=>{
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result=await CourseService.removeFacultiesFromCourseFromDB(
    courseId,
    faculties,
  )
  sendResponse(res,{
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculties removed  successfully',
    data: result,
  })
})



export const CourseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
  updateCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse
};
