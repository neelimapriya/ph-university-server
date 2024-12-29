import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { EnrolledCourseService } from "./enrolledCourse.service";


const createEnrolledCourse = catchAsync(async (req, res) => {
  const userId=req.user.userId
    const result = await EnrolledCourseService.createEnrolledCourse(userId,req.body);
    
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Course Enrolled successfully',
      data: result,
    });
  });
const updateEnrolledCourse = catchAsync(async (req, res) => {
 
  const facultyId=req.user.userId
    const result = await EnrolledCourseService.updateEnrolledCourseMarksIntoDb(facultyId,req.body);
    
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Update Marks successfully',
      data: result,
    });
  });

  export const EnrolledCourseController={
createEnrolledCourse,
updateEnrolledCourse
  }