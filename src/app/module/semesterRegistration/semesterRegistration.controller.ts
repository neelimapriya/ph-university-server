import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { SemesterRegistrationService } from "./semesterRegistration.service";


const createSemesterRegistration = catchAsync(async (req, res) => {
  
    const result = await SemesterRegistrationService.createSemesterRegistrationIntoDb(req.body);
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Semester Registration is created successfully',
      data: result,
    });
  });
const getAllSemesterRegistration = catchAsync(async (req, res) => {
  
    const result = await SemesterRegistrationService.getAllSemesterRegistrationFromDb(req.query);
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Semester Registration are retrieve successfully',
      data: result,
    });
  });
const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  
    const {id}=req.params
    const result = await SemesterRegistrationService.getSingleSemesterRegistrationFromDb(id);
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Semester Registration is retrieve successfully',
      data: result,
    });
  });
const updateSemesterRegistration = catchAsync(async (req, res) => {
  const {id}=req.params
    const result = await SemesterRegistrationService.updateSemesterRegistrationFromDb(id,req.body);
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Semester Registration is updated successfully',
      data: result,
    });
  });

  export const semesterRegistrationController={
    createSemesterRegistration,
    getAllSemesterRegistration,
    getSingleSemesterRegistration,
    updateSemesterRegistration
  }