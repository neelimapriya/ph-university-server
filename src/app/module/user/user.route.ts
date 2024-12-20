import  express  from "express"
import { userControllers } from "./user.controller"
import validateRequest from "../../middleware/validateRequest"
import { createStudentValidationSchema } from "../students/student.validationZod"
import { createFacultyValidationSchema } from "../Faculty/faculty.validation"
import { createAdminValidationSchema } from "../Admin/admin.validation"
import auth from "../../middleware/auth"
import { User_Role } from "./user.constant"


const router=express.Router()
// auth(User_Role.admin)
router.post('/create-student',validateRequest(createStudentValidationSchema),userControllers.createStudent )

router.post(
    '/create-faculty',
    validateRequest(createFacultyValidationSchema),
    userControllers.createFaculty,
  );
  router.post(
    '/create-admin',
    // auth(USER_ROLE.admin),
    validateRequest(createAdminValidationSchema),
    userControllers.createAdmin,
  );
  

export const userRoutes=router