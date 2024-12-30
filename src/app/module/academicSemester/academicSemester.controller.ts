import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { academicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {


  const result = await academicSemesterServices.createAcademicSemesterIntoDb(
    req.body,
  );

  sendResponse(res, {
    success: true,
    message: 'Academic Semester is created successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});

const getAllSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.getAllSemesterFromDB();
  sendResponse(res, {
    success: true,
    message: 'Semesters are retrieved  successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});

const getSingleSemester=catchAsync(async(req,res)=>{
const {semesterId}=req.params
// console.log(req.params)
const result=await academicSemesterServices.getSingleSemesterFromDB(semesterId)
// console.log(result)
sendResponse(res, {
    success: true,
    message: 'Semester is retrieved  successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
})

export const academicSemesterControllers = {
  createAcademicSemester,
  getAllSemester,
  getSingleSemester
};
