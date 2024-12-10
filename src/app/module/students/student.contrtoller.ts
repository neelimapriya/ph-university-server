/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { StudentModelSchema } from './student.model';



// all student data
const getAllStudents:RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFormDB(req.query);
  sendResponse(res, {
    success: true,
    message: 'Students are retrieved  successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});

// single student data
const getAStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await StudentServices.getAStudentFormDB(id);
  sendResponse(res, {
    success: true,
    message: 'Student is retrieved  successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});

// delete a student
const deleteAStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await StudentServices.deleteStudentFromDB(id);

  sendResponse(res, {
    success: true,
    message: 'Student deleted successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});
// update student
const updateStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const {student}=req.body
  const result = await StudentServices.updateStudentIntoDB(id,student);

  sendResponse(res, {
    success: true,
    message: 'Student updated successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});

export const studentController = {
  getAllStudents,
  getAStudent,
  deleteAStudent,
  updateStudent
};
