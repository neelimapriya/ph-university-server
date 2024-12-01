import express from 'express';
import { studentController } from './student.contrtoller';

const router = express.Router();

// will cal controller function

router.get('/', studentController.getAllStudents)
router.get('/:studentId', studentController.getAStudent)
router.delete('/:studentId', studentController.deleteAStudent)

export const StudentRoutes = router;

