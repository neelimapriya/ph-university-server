import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { AcademicDepartmentServices } from './academicDepartment.service';


const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(
    req.body,
  );
  sendResponse(res, {
    success: true,
    message: 'Academic Department is created successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});
const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.getAllAcademicDepartmentFromDB(req.query);
  sendResponse(res, {
    success: true,
    message: 'Academic department are retrieve successfully',
    meta: result.meta,
    data: result.result,
    statusCode: StatusCodes.OK,
  });
});
const getSingleAcademicDepartment=catchAsync(async(req,res)=>{
const {departmentId}=req.params
const result=await AcademicDepartmentServices.getSingleAcademicDepartmentDB(departmentId)
sendResponse(res, {
    success: true,
    message: 'Academic Department is retrieve successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
})

const updateAcademicDepartment=catchAsync(async(req,res)=>{
    const {departmentId}=req.params
    const result=await AcademicDepartmentServices.updateAcademicDepartment(departmentId,req.body)
    sendResponse(res, {
        success: true,
        message: 'Academic Department is updated successfully',
        data: result,
        statusCode: StatusCodes.OK,
      });
})

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment
};
