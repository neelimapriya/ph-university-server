import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';
import { offeredCourseController } from './offeredCourse.controller';
import auth from '../../middleware/auth';
import { User_Role } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-offered-course',
  auth(User_Role.superAdmin, User_Role.admin),
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  offeredCourseController.createOfferedCourse,
);

router.patch(
  '/:id',
  auth(User_Role.superAdmin, User_Role.admin),
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  offeredCourseController.updateOfferedCourse,
);

router.get(
  '/',
  auth(User_Role.superAdmin, User_Role.admin, User_Role.faculty),
  offeredCourseController.getOfferedCourse,
);
router.get(
  '/my-offered-courses',
  auth(User_Role.student),
  offeredCourseController.getMyOfferedCourses,
);
router.get(
  '/:id',
  
  auth(
    User_Role.superAdmin,
    User_Role.admin,
    User_Role.faculty,
    User_Role.student,
  ),
  offeredCourseController.getSingleOfferedCourses,
);


export const offeredCourseRoutes = router;
