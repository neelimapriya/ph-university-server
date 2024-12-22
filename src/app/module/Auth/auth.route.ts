import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { AuthValidation } from './auth.validation'
import { AuthControllers } from './auth.controller'
import auth from '../../middleware/auth'
import { User_Role } from '../user/user.constant'


const router=express.Router()

router.post('/login',validateRequest(AuthValidation.loginValidationSchema),AuthControllers.loginUser)
router.post('/change-password',auth(User_Role.admin, User_Role.faculty,User_Role.student),validateRequest(AuthValidation.changePasswordValidationSchema),AuthControllers.changePassword)
router.post('/refresh-token',validateRequest(AuthValidation.refreshTokenValidationSchema),AuthControllers.refreshToken)

export const AuthRoutes=router