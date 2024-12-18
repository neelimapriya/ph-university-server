import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { offeredCourseService } from "./offeredCourse.service";


const createOfferedCourse=catchAsync(async(req:Request, res:Response)=>{
    const result=await offeredCourseService.createOfferedCourseIntoDb(req.body)

    sendResponse(res,{
        statusCode:StatusCodes.OK,
        success:true,
        message:"Offered course is created successfully",
        data:result
    })
})
const getOfferedCourse=catchAsync(async(req:Request, res:Response)=>{
    const result=await offeredCourseService.createOfferedCourseIntoDb(req.body)

    sendResponse(res,{
        statusCode:StatusCodes.OK,
        success:true,
        message:"Offered course is created successfully",
        data:result
    })
})

export const offeredCourseController={
    createOfferedCourse,
    getOfferedCourse
}