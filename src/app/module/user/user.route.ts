import  express  from "express"
import { userControllers } from "./user.controller"
import validateRequest from "../../middleware/validateRequest"
import { createStudentValidationSchema } from "../students/student.validationZod"


const router=express.Router()

router.post('/create-student',validateRequest(createStudentValidationSchema),userControllers.createStudent )

export const userRoutes=router