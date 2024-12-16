import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseController } from './course.controller';

const router = express.Router();

router.post(
  '/create-Course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseController.createCourse,
);
router.get('/', CourseController.getAllCourses);
router.get('/:id', CourseController.getSingleCourse);
router.delete('/:id', CourseController.deleteCourse);
router.patch('/:id',validateRequest(CourseValidations.updateCourseValidationSchema) ,CourseController.updateCourse);
router.put('/:courseId/assign-faculty',validateRequest(CourseValidations.facultiesWithCourseValidationSchema) ,CourseController.assignFacultiesWithCourse);
router.delete('/:courseId/remove-faculty',validateRequest(CourseValidations.facultiesWithCourseValidationSchema) ,CourseController.removeFacultiesFromCourse);

export const CourseRoutes = router;
