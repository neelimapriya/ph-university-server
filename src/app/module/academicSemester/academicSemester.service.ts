import { TAcademicSemester } from './academicSemester.interface';
import { academicSemester } from './academicSemester';
import { academicSemesterNameCodeMapping } from './academicSemester.const';

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapping[payload.name] !== payload.code) {
    throw new Error('Invalid semester Code');
  }
  const result = await academicSemester.create(payload);
  return result;
};

const getAllSemesterFromDB = async () => {
  const result = await academicSemester.find();
  return result;
};

const getSingleSemesterFromDB=async(id:string)=>{
  const result = await academicSemester.findById(id);
  // const result= await academicSemester.aggregate([{$match:{id:id}}])
  console.log(result);
  return result
}

export const academicSemesterServices = {
  createAcademicSemesterIntoDb,
  getAllSemesterFromDB,
 getSingleSemesterFromDB
};
