import express from 'express';
import { studentController } from './student.contrtoller';

const router = express.Router();

// will call controller function

router.get('/', studentController.getAllStudents)
router.get('/:id', studentController.getAStudent)
router.patch('/:id', studentController.updateStudent)
router.delete('/:id', studentController.deleteAStudent)

export const StudentRoutes = router;

