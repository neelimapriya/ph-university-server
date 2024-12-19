import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';
import { offeredCourseController } from './offeredCourse.controller';

const router = express.Router();



router.post(
    '/create-offered-course',
    validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
    offeredCourseController.createOfferedCourse,
  );

  router.patch(
    '/:id',
    validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
    offeredCourseController.updateOfferedCourse,
  );


export const offeredCourseRoutes = router;