import { Student } from "./student.interface";
import { studentModel } from "./student.model";

const createStudentIntoDB=async(student:Student)=>{
   const result= await studentModel.create(student)
   return result
}

const getAllStudentsFormDB=async()=>{
    const result=await studentModel.find()
    return result;
}
const getAStudentFormDB=async(id:string)=>{
    const result=await studentModel.findOne({id:id})
    return result;
}

export const StudentServices={
    createStudentIntoDB,
    getAllStudentsFormDB,
    getAStudentFormDB
}