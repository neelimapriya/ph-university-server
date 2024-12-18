
import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { semesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';

const router=express.Router()

router.post('/create-semester',validateRequest(SemesterRegistrationValidations.createSemesterRegistrationValidationSchema),semesterRegistrationController.createSemesterRegistration )
router.get('/',semesterRegistrationController.getAllSemesterRegistration )
router.get('/:id',semesterRegistrationController.getSingleSemesterRegistration )
router.patch('/:id',validateRequest(SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema),semesterRegistrationController.updateSemesterRegistration )

export const semesterRegistrationRoutes=router