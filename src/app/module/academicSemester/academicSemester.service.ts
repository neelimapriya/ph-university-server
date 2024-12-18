import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { academicSemesterNameCodeMapping } from './academicSemester.const';
import AppError from '../../errors/AppErrors';

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapping[payload.name] !== payload.code) {
    throw new AppError(400,'Invalid semester Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleSemesterFromDB=async(id:string)=>{
  const result = await AcademicSemester.findById(id);
  // const result= await academicSemester.aggregate([{$match:{id:id}}])
  // console.log(result);
  return result
}

export const academicSemesterServices = {
  createAcademicSemesterIntoDb,
  getAllSemesterFromDB,
 getSingleSemesterFromDB
};
