// import { TStudent } from './student.interface';
// import { StudentModel } from "./student.interface";
import mongoose from 'mongoose';
import { StudentModelSchema } from './student.model';
import AppError from '../../errors/AppErrors';
import { StatusCodes } from 'http-status-codes';
import { userModel } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';

// const createStudentIntoDB = async (Students: TStudent) => {
//   if (await StudentModelSchema.isUserExists(Students.id)) {
//     throw new Error('User already exists!');
//   }

//   const result = await StudentModelSchema.create(Students); //built in static method

//   // static method
//   // const Student=new StudentModelSchema(Students)
//   // if(await Student.isUserExists(Students.id)){
//   //     throw new Error("User already exist")
//   // }
//   //   const result = await Student.save(); //built in instance method
//   return result;
// };

const getAllStudentsFormDB = async (query: Record<string, unknown>) => {
  const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];

  const studentQuery = new QueryBuilder(
    StudentModelSchema.find()
    .populate('Users')
      .populate('AcademicSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .pagination()
    .fields();
  const result = await studentQuery.modelQuery;

  // console.log(result, 'service');
  return result;
};
const getAStudentFormDB = async (id: string) => {
  const result = await StudentModelSchema.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  // alternative
  // const result = await StudentModelSchema.aggregate([{$match:{id:id}}]);
  return result;
};
// delete a doc
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await StudentModelSchema.findByIdAndUpdate(
       id ,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete student');
    }
    const userId=deletedStudent.user
    const deleteUser = await userModel.findByIdAndUpdate(
     userId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete user');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete student');
  }
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }
  // console.log(modifiedUpdatedData);
  const result = await StudentModelSchema.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const StudentServices = {
  getAllStudentsFormDB,
  getAStudentFormDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
