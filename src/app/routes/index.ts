import { Router } from 'express';
import { userRoutes } from '../module/user/user.route';
import { StudentRoutes } from '../module/students/student.route';
import { academicSemesterRoutes } from '../module/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../module/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../module/academicDepartment/academicDepartment.route';
import { CourseRoutes } from '../module/course/course.route';
import { FacultyRoutes } from '../module/Faculty/faculty.route';
import { semesterRegistrationRoutes} from '../module/semesterRegistration/semesterRegistration.route';
import { offeredCourseRoutes } from '../module/offeredCourse/offeredCourse.route';

const router = Router();

const moduleRoutes=[
    {
        path:'/users',
        route:userRoutes
    },
    {
        path:'/students',
        route:StudentRoutes
    },
    {
        path: '/faculties',
        route: FacultyRoutes,
      },
    {
        path:'/academic-semester',
        route:academicSemesterRoutes
    },
    {
        path:'/academic-faculty',
        route:AcademicFacultyRoutes
    },
    {
        path:'/academic-department',
        route:AcademicDepartmentRoutes
    },
    {
        path:'/courses',
        route:CourseRoutes
    },
    {
        path:'/semester-registration',
        route:semesterRegistrationRoutes
    },
    {
        path:'/offered-course',
        route:offeredCourseRoutes
    },
]

moduleRoutes.forEach((route)=>router.use(route.path,route.route))

export default router;
