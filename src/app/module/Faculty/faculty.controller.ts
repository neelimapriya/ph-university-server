import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { FacultyServices } from "./faculty.service";
import { sendResponse } from "../../utils/sendResponse";


const getSingleFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await FacultyServices.getSingleFacultyFromDB( id );
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Faculty is retrieved successfully',
      data: result,
    });
  });
  
  const getAllFaculties = catchAsync(async (req, res) => {
    // console.log('test', req.user);
    // console.log(req.cookies);
    const result = await FacultyServices.getAllFacultiesFromDB(req.query);
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Faculties are retrieved successfully',
      data: result,
    });
  });
  
  const updateFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { faculty } = req.body;
    const result = await FacultyServices.updateFacultyIntoDB( id , faculty);
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Faculty is updated successfully',
      data: result,
    });
  });
  
  const deleteFaculty = catchAsync(async (req, res) => {
    const {  id } = req.params;
    const result = await FacultyServices.deleteFacultyFromDB(id);
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Faculty is deleted successfully',
      data: result,
    });
  });
  
  export const FacultyControllers = {
    getAllFaculties,
    getSingleFaculty,
    deleteFaculty,
    updateFaculty,
  };