import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  );
  sendResponse(res, {
    success: true,
    message: 'Academic faculty is created successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});
const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultyFromDB();
  sendResponse(res, {
    success: true,
    message: 'Academic faculties are retrieve successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});
const getSingleAcademicFaculty=catchAsync(async(req,res)=>{
const {facultyId}=req.params
const result=await AcademicFacultyServices.getSingleAcademicFacultyDB(facultyId)
sendResponse(res, {
    success: true,
    message: 'Academic faculty is retrieve successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
})

const updateAcademicFaculty=catchAsync(async(req,res)=>{
    const {facultyId}=req.params
    const result=await AcademicFacultyServices.updateAcademicFaculty(facultyId,req.body)
    sendResponse(res, {
        success: true,
        message: 'Academic faculty is updated successfully',
        data: result,
        statusCode: StatusCodes.OK,
      });
})

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty
  
};
