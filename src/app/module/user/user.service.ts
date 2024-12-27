/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import { TStudent } from '../students/student.interface';
import { StudentModelSchema } from '../students/student.model';
import { TUser } from './user.interface';
import { userModel } from './user.model';
import {
  generateAdminId,
  generatedStudentId,
  generateFacultyId,
} from './user.utils';
import AppError from '../../errors/AppErrors';
import { StatusCodes } from 'http-status-codes';
import { TFaculty } from '../Faculty/faculty.interface';
import { AcademicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../Faculty/faculty.model';
import { TAdmin } from '../Admin/admin.interface';
import { Admin } from '../Admin/admin.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';


const createStudentIntoDB = async (
  file: any,
  password: string,
  payload: TStudent,
) => {
  const userData: Partial<TUser> = {};

  // if password is not given , use default password
  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'student';
  userData.email = payload.email;

  // find semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // set generated id
    if (admissionSemester) {
      userData.id = await generatedStudentId(admissionSemester);
    } else {
      console.error('admission Semester is null');
    }

    // send image to cloudinary
    const imageName = `${userData.id}${payload?.name?.firstName}`;
    const path = file.path;
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    // payload.profileImg = secure_url as string;

    // create a user (transaction-1)
    const newUser = await userModel.create([userData], { session }); //built in static method
    //   create a student
    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }
    // set id, _id as user
    payload.id = newUser[0].id; //embedding id
    payload.user = newUser[0]._id; //reference _id
    payload.profileImg = secure_url;

    // create a student (transaction-2)
    const newStudent = await StudentModelSchema.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const createFacultyIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = 'faculty';
  userData.email = payload.email;

  // find academic department info
  const academicDepartment = await AcademicDepartmentModel.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // send image to cloudinary
    const imageName = `${userData.id}${payload?.name?.firstName}`;
    const path = file.path;
    const { secure_url } = await sendImageToCloudinary(imageName, path);

    // create a user (transaction-1)
    const newUser = await userModel.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id
    payload.profileImg = secure_url;

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TAdmin,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_pass as string);

  //set admin role
  userData.role = 'admin';
  // set admin mail
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();
    // send image to cloudinary
    const imageName = `${userData.id}${payload?.name?.firstName}`;
    const path = file.path;
    const { secure_url } = await sendImageToCloudinary(imageName, path);

    // create a user (transaction-1)
    const newUser = await userModel.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id
    payload.profileImg = secure_url;

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMe = async (userId: string, role: string) => {
  let result = null;
  if (role === 'admin') {
    result = await Admin.findOne({ id: userId });
  }
  if (role === 'faculty') {
    result = await Faculty.findOne({ id: userId });
  }
  if (role === 'student') {
    result = await StudentModelSchema.findOne({ id: userId });
  }

  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await userModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatus,
};
