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
      message: 'Semester Registration is created successfully',
      data: result,
    });
  });

  export const EnrolledCourseController={
createEnrolledCourse
  }