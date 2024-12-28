/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppErrors';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import EnrolledCourse from './enrolledCourse.model';
import { StudentModelSchema } from '../students/student.model';
import mongoose from 'mongoose';

const createEnrolledCourse = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  /*
  step-1:check if the offered course is exists
  step-2:check if the student is already exist
  step-3:create and enrolled course
  **/

  const { offeredCourse } = payload;
  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Offered course not exists');
  }
  const student = await StudentModelSchema.findOne({ id: userId }, { _id: 1 });
  if (!student) {
    throw new AppError(StatusCodes.NOT_FOUND, 'student not found!');
  }
  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
    offeredCourse,
    student: student._id,
  });

  if (isStudentAlreadyEnrolled) {
    throw new AppError(StatusCodes.CONFLICT, 'Student is already enrolled!');
  }
  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new AppError(StatusCodes.BAD_GATEWAY, 'Room is full!');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await EnrolledCourse.create([
      {
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        academicSemester: isOfferedCourseExists.academicSemester,
        academicFaculty: isOfferedCourseExists.academicFaculty,
        academicDepartment: isOfferedCourseExists.academicDepartment,
        offeredCourse: offeredCourse,
        course: isOfferedCourseExists.course,
        student: student._id,
        faculty: isOfferedCourseExists.faculty,
        isEnrolled: true,
      },
    ]);
    if (!result) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Failed to enroll this course!',
      );
    }
    const maxCapacity = isOfferedCourseExists.maxCapacity;
    await OfferedCourse.findByIdAndUpdate(offeredCourse, {
      maxCapacity: maxCapacity - 1,
    });

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const EnrolledCourseService = {
  createEnrolledCourse,
};