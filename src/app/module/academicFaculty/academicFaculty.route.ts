import express from 'express';
import { academicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middleware/validateRequest';
import auth from '../../middleware/auth';
import { User_Role } from '../user/user.constant';


const router = express.Router();

router.post(
  '/create-academic-faculty',
  auth(User_Role.superAdmin,User_Role.admin),
  validateRequest(
    academicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
);
router.get('/', AcademicFacultyController.getAllAcademicFaculty);
router.get('/:facultyId', AcademicFacultyController.getSingleAcademicFaculty);
router.patch('/:facultyId', AcademicFacultyController.updateAcademicFaculty);

export const AcademicFacultyRoutes = router;
