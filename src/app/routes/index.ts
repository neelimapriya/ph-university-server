import { Router } from 'express';
import { userRoutes } from '../module/user/user.route';
import { StudentRoutes } from '../module/students/student.route';

const router = Router();

const moduleRoutes=[
    {
        path:'/users',
        route:userRoutes
    },
    {
        path:'/students',
        route:StudentRoutes
    }
]

moduleRoutes.forEach((route)=>router.use(route.path,route.route))

export default router;
