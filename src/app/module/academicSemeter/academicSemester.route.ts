import express from 'express';
import { academicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post('/create-academic-semester',validateRequest(AcademicSemesterValidation.createAcademicSemesterValidation),academicSemesterControllers.createAcademicSemester);
router.get('/get-all-academic-semester',academicSemesterControllers.getAllSemester);
router.get('/:semesterId',academicSemesterControllers.getSingleSemester);

export const academicSemesterRoutes = router;
