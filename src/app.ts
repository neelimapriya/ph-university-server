/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { notFound } from './app/middleware/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

// parser
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:['http://localhost:5173'], credentials:true}));

// /api/v1/students/create-student

// application routes
app.use('/api/v1', router);

const getAController = (req: Request, res: Response) => {
  // const a = 19;
  res.send('PH University server');
};

app.get('/', getAController);

// console.log(process.cwd());

app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
