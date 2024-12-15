/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchableFIeld } from './course.constant';
import { TCourse } from './course.interface';
import { Course } from './course.model';
import AppError from '../../errors/AppErrors';
import { StatusCodes } from 'http-status-codes';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('PreRequisiteCourses.course'),
    query,
  )
    .search(courseSearchableFIeld)
    .filter()
    .sort()
    .pagination()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};
const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'PreRequisiteCourses.course',
  );
  return result;
};
const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};
const updateCourseFromDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const updatedBasicInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );
    if (!updatedBasicInfo) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update course!');
    }

    // check if there is any pre requisite courses to update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // filter out the deleted field
      const deletedPreRequisites = preRequisiteCourses
        .filter((el: { course: any; isDeleted: any; }) => el.course && el.isDeleted)
        .map((el: { course: any; }) => el.course);

      const deletedPreRequisitesCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            PreRequisiteCourses: {
              course: { $in: deletedPreRequisites },
            },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletedPreRequisitesCourses) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update course!');
      }

      // filter out the new course fields
      const newPreRequisites = preRequisiteCourses?.filter(
        (el: { course: any; isDeleted: any; }) => el.course && !el.isDeleted,
      );

      const newPreRequisitesCourse = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { PreRequisiteCourses: { $each: newPreRequisites } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!newPreRequisitesCourse) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update course!');
      }
    }
    await session.commitTransaction();
    await session.endSession();
    const result = await Course.findById(id).populate(
      'PreRequisiteCourses.course',
    );
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, 'FAiled to update course');
  }
};

export const CourseService = {
  createCourseIntoDB,
  getSingleCourseFromDB,
  getAllCourseFromDB,
  deleteCourseFromDB,
  updateCourseFromDB,
};
