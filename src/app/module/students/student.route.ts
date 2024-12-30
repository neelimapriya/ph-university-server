import express from 'express';
import { studentController } from './student.contrtoller';
import auth from '../../middleware/auth';
import { User_Role } from '../user/user.constant';

const router = express.Router();

router.get(
  '/',
  auth(User_Role.superAdmin, User_Role.admin, User_Role.faculty),
  studentController.getAllStudents,
);
router.get(
  '/:id',
  auth(User_Role.superAdmin, User_Role.admin, User_Role.faculty),
  studentController.getAStudent,
);
router.patch(
  '/:id',
  auth(User_Role.superAdmin, User_Role.admin, User_Role.faculty),
  studentController.updateStudent,
);
router.delete(
  '/:id',
  auth(User_Role.superAdmin, User_Role.admin, User_Role.faculty),
  studentController.deleteAStudent,
);

export const StudentRoutes = router;
