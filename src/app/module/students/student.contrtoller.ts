import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // will call  service func to send this data
    const result = await StudentServices.createStudentIntoDB(studentData);
    // send response
    res.status(200).json({
      success: true,
      message: 'Student data created successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

// all student data
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFormDB();

    res.status(200).json({
      success: true,
      message: 'Students are retrieved  successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
// single student data
const getAStudent=async(req:Request,res:Response)=>{
try{
    const {studentId}=req.params;
const result=await StudentServices.getAStudentFormDB(studentId)
res.status(200).json({
    success: true,
    message: 'Student is retrieved  successfully',
    data: result,
  });
}catch(err){
    console.log(err)
}
}
export const studentController = {
  createStudent,
  getAllStudents,
  getAStudent
};
