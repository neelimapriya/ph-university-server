import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/module/students/student.route';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());


// /api/v1/students/create-student


// application routes
app.use('/api/v1/students', StudentRoutes)





const getAController=(req:Request, res:Response)=>{
  const a=19
  res.send(a)
}

app.get('/',getAController);

// console.log(process.cwd());

export default app;
