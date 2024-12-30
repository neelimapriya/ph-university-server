import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { semesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
import auth from '../../middleware/auth';
import { User_Role } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-semester',
  auth(User_Role.superAdmin, User_Role.admin),
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationController.createSemesterRegistration,
);
router.get(
  '/',
  auth(
    User_Role.superAdmin,
    User_Role.admin,
    User_Role.faculty,
    User_Role.student,
  ),
  semesterRegistrationController.getAllSemesterRegistration,
);
router.get(
  '/:id',
  auth(
    User_Role.superAdmin,
    User_Role.admin,
    User_Role.faculty,
    User_Role.student,
  ),
  semesterRegistrationController.getSingleSemesterRegistration,
);
router.patch(
  '/:id',
  auth(User_Role.superAdmin, User_Role.admin),
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationController.updateSemesterRegistration,
);

export const semesterRegistrationRoutes = router;
