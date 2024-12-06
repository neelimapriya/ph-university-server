/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import  {  Request, Response, NextFunction } from 'express';


export const globalErrorHandler=(err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode =err.statusCode || 500;
    const message = err.message || 'Something went wrong!';
  
     res.status(statusCode).json({
      success: false,
      message,
      error: err,
    });
  }