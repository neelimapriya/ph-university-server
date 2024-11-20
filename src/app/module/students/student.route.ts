import express from 'express';
import { studentController } from './student.contrtoller';

const router = express.Router();

// will cal controller function
router.post('/create-student', studentController.createStudent);

router.get('/', studentController.getAllStudents)
router.get('/:studentId', studentController.getAStudent)

export const StudentRoutes = router;

