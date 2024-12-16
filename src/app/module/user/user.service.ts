import mongoose from 'mongoose';
import config from '../../config';
import { academicSemester } from '../academicSemester/academicSemester';
import { TStudent } from '../students/student.interface';
import { StudentModelSchema } from '../students/student.model';
import { TUser } from './user.interface';
import { userModel } from './user.model';
import { generatedStudentId } from './user.utils';
import AppError from '../../errors/AppErrors';
import { StatusCodes } from 'http-status-codes';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};

  // if password is not given , use default password
  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'student';

  // find semester info
  const admissionSemester = await academicSemester.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // set generated id
    userData.id = await generatedStudentId(admissionSemester);
    // create a user (transaction-1)
    const newUser = await userModel.create([userData], { session }); //built in static method
    //   create a student
    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user');}
    // set id, _id as user
    payload.id = newUser[0].id; //embedding id
    payload.user = newUser[0]._id; //reference _id
    const newStudent = await StudentModelSchema.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  } catch (error :any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error)
  }
};
export const UserServices = {
  createStudentIntoDB,
};
