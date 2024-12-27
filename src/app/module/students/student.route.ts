import express from 'express';
import { studentController } from './student.contrtoller';
import auth from '../../middleware/auth';
import { User_Role } from '../user/user.constant';

const router = express.Router();

// will call controller function

router.get('/', studentController.getAllStudents)
router.get('/:id',auth(User_Role.admin,User_Role.faculty), studentController.getAStudent)
router.patch('/:id', studentController.updateStudent)
router.delete('/:id', studentController.deleteAStudent)

export const StudentRoutes = router;

