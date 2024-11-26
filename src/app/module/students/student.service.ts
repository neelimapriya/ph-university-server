import { TStudent } from './student.interface';
// import { StudentModel } from "./student.interface";
import { StudentModelSchema } from './student.model';

const createStudentIntoDB = async (Students: TStudent) => {
  if (await StudentModelSchema.isUserExists(Students.id)) {
    throw new Error('User already exists!');
  }

  const result = await StudentModelSchema.create(Students); //built in static method

  // static method
  // const Student=new StudentModelSchema(Students)
  // if(await Student.isUserExists(Students.id)){
  //     throw new Error("User already exist")
  // }
  //   const result = await Student.save(); //built in instance method
  return result;
};

const getAllStudentsFormDB = async () => {
  const result = await StudentModelSchema.find();
  return result;
};
const getAStudentFormDB = async (id: string) => {
  const result = await StudentModelSchema.findOne({ id: id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFormDB,
  getAStudentFormDB,
};
