import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppErrors';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { AcademicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import { Course } from '../course/course.model';
import { Faculty } from '../Faculty/faculty.model';
import { hasTimeConflict } from './offeredCourse.utils';

const createOfferedCourseIntoDb = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;

  // check the current semester is exist
  const isSemesterRegistrationExist =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistrationExist) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Semester registration not found',
    );
  }
  // check the current Academic faculty is exist
  const isAcademicFacultyExist =
    await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFacultyExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Academic faculty not found');
  }

  // check the Academic department is exist
  const isAcademicDepartmentExist =
    await AcademicDepartmentModel.findById(academicDepartment);

  if (!isAcademicDepartmentExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Academic Department not found');
  }

  // check the current course is exist
  const isCourseExist = await Course.findById(course);

  if (!isCourseExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'course not found');
  }
  // check the current semester is exist
  const isFacultyExist = await Faculty.findById(faculty);

  if (!isFacultyExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Faculty not found');
  }

  // check if the department is belong to the  faculty
  const isDepartmentBelongToFaculty = await AcademicDepartmentModel.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `This ${isAcademicDepartmentExist.name} is not  belong to this ${isAcademicFacultyExist.name}`,
    );
  }

  // check if the same offered course same section in same registered semester exists

  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `Offered course with same section is already exist!`,
    );
  }

  // get the schedules of the faculties
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      StatusCodes.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`,
    );
  }

  const academicSemester = isSemesterRegistrationExist.academicSemester;

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

export const offeredCourseService = {
  createOfferedCourseIntoDb,
};
