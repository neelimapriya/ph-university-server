import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
// import studentValidationSchema from './student.validationJoi';
// import studentValidationSchema from './student.validationZod';

// const createStudent = async (req: Request, res: Response) => {
//   try {
//     const { student: studentData } = req.body;
//     console.log(req.body);

//     // data validation using zod
//     const ZodParseData = studentValidationSchema.parse(studentData);

//     //data validation using joi
//     //  const {error,value}= studentValidationSchema.validate(studentData)
//     //  console.log(value)

//     // will call  service func to send this data
//     const result = await StudentServices.createStudentIntoDB(ZodParseData);

//     // if(error){
//     //   res.status(500).json({
//     //     success: true,
//     //     message: 'Something went wrong',
//     //     error,
//     //   });
//     // }

//     // send response
//     res.status(200).json({
//       success: true,
//       message: 'Student data created successfully',
//       data: result,
//     });
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message || 'something went wrong',
//       error: err,
//     });
//   }
// };

// all student data
const getAllStudents = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentsFormDB();
    console.log(result,"controller")
    res.status(200).json({
      success: true,
      message: 'Students are retrieved  successfully',
      data: result,
    });
  } catch (err) {
   next(err)
  }
};
// single student data
const getAStudent = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getAStudentFormDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrieved  successfully',
      data: result,
    });
  } catch (err) {
   next(err)
  }
};

// delete a student
const deleteAStudent = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { studentId } = req.params;
    const result=await StudentServices.deleteStudentFromDB(studentId)
    
    res.status(200).json({
      success: true,
      message: 'Student deleted  successfully',
      data: result,
    });

  } catch (err) {
    next(err)
  }
};

export const studentController = {
 
  getAllStudents,
  getAStudent,
  deleteAStudent
};
