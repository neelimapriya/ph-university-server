import express from 'express';
import { academicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import auth from '../../middleware/auth';
import { User_Role } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-academic-semester',
  auth(User_Role.superAdmin, User_Role.admin),
  validateRequest(AcademicSemesterValidation.createAcademicSemesterValidation),
  academicSemesterControllers.createAcademicSemester,
);
router.get(
  '/',
  auth(
    User_Role.superAdmin,
    User_Role.admin,
    User_Role.faculty,
    User_Role.student,
  ),
  academicSemesterControllers.getAllSemester,
);
router.get(
  '/:semesterId',
  auth(
    User_Role.superAdmin,
    User_Role.admin,
    User_Role.faculty,
    User_Role.student,
  ),
  academicSemesterControllers.getSingleSemester,
);

export const academicSemesterRoutes = router;
