/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/module/students/student.route';
import { userRoutes } from './app/module/user/user.route';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { notFound } from './app/middleware/notFound';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// /api/v1/students/create-student

// application routes
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', userRoutes);

const getAController = (req: Request, res: Response) => {
  // const a = 19;
  res.send('PH University server');
};

app.get('/', getAController);

// console.log(process.cwd());

app.use(globalErrorHandler);

// not found
app.use(notFound)

export default app;
