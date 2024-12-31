import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseController } from './course.controller';
import auth from '../../middleware/auth';
import { User_Role } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-Course',
  auth(User_Role.superAdmin, User_Role.admin),
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseController.createCourse,
);
router.get(
  '/',
  auth(
    User_Role.superAdmin,
    User_Role.admin,
    User_Role.faculty,
    User_Role.student,
  ),
  CourseController.getAllCourses,
);
router.get(
  '/:id',
  auth(
    User_Role.superAdmin,
    User_Role.admin,
    User_Role.faculty,
    User_Role.student,
  ),
  CourseController.getSingleCourse,
);
router.delete(
  '/:id',
  auth(User_Role.superAdmin, User_Role.admin),
  CourseController.deleteCourse,
);
router.patch(
  '/:id',
  auth(User_Role.superAdmin, User_Role.admin),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseController.updateCourse,
);
router.put(
  '/:courseId/assign-faculty',
  auth(User_Role.superAdmin, User_Role.admin),
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseController.assignFacultiesWithCourse,
);
router.get(
  '/:courseId/get-faculty',
  auth(
    User_Role.superAdmin,
    User_Role.admin,
    User_Role.faculty,
    User_Role.student,
  ),
  CourseController.getFacultiesWithCourse,
);
router.delete(
  '/:courseId/remove-faculty',
  auth(User_Role.superAdmin, User_Role.admin),
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseController.removeFacultiesFromCourse,
);

export const CourseRoutes = router;
