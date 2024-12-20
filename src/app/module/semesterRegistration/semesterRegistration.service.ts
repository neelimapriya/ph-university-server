import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppErrors';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { RegistrationStatus } from './semesterRegistration.constant';

const createSemesterRegistrationIntoDb = async (
  payload: TSemesterRegistration,
) => {
  // check if the semester is exist
  const academicSemester = payload?.academicSemester;

 //check if there any registered semester that is already 'UPCOMING'|'ONGOING'
 const isThereAnyUpcomingOrOngoingSEmester =
 await SemesterRegistration.findOne({
   $or: [
     { status:RegistrationStatus.UPCOMING },
     { status:RegistrationStatus.ONGOING },
   ],
 });
 if(isThereAnyUpcomingOrOngoingSEmester){
    throw new AppError(StatusCodes.BAD_REQUEST,`There is already an ${isThereAnyUpcomingOrOngoingSEmester.status} registered semester.`)
 }
  // check if the semester registration is already  exist
  const isSemesterRegistrationExist = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExist) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'This semester registration is already exist!',
    );
  }



  const isAcademicSemesterExist =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExist) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'This Academic semester does not exist!',
    );
  }
  const result=await SemesterRegistration.create(payload)
  return result
};
const getAllSemesterRegistrationFromDb = async (query:Record<string,unknown>) => {
    const semesterRegistrationQuery=new QueryBuilder(SemesterRegistration.find().populate('academicSemester'),query)
    .fields()
    .filter()
    .sort()
    .pagination()

const result=await semesterRegistrationQuery.modelQuery
return result

};
const getSingleSemesterRegistrationFromDb = async (id:string) => {
    const result=await SemesterRegistration.findById(id)
    return result
};


const updateSemesterRegistrationFromDb = async (id:string,payload:Partial<TSemesterRegistration>) => {
   /**
   * Step1: Check if the semester is exist
   * Step2: Check if the requested registered semester is exists
   * Step3: If the requested semester registration is ended, we will not update anything
   * Step4: If the requested semester registration is 'UPCOMING', we will let update everything.
   * Step5: If the requested semester registration is 'ONGOING', we will not update anything  except status to 'ENDED'
   * Step6: If the requested semester registration is 'ENDED' , we will not update anything
   *
   * UPCOMING --> ONGOING --> ENDED
   *
   */
  // check if the requested registered semester is exists
  // check if the semester is already registered!
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This semester is not found !');
  }
// if the requested semester registration is ended, we will not update anything 
const currentSemesterStatus = isSemesterRegistrationExists?.status;
const requestedStatus = payload?.status;

if(currentSemesterStatus === RegistrationStatus.ENDED){
throw new AppError(StatusCodes.BAD_REQUEST,`This semester is already ${currentSemesterStatus}`)
}

 // UPCOMING --> ONGOING --> ENDED
 if (
  currentSemesterStatus === RegistrationStatus.UPCOMING &&
  requestedStatus === RegistrationStatus.ENDED
) {
  throw new AppError(
    StatusCodes.BAD_REQUEST,
    `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
  );
}
if (
  currentSemesterStatus === RegistrationStatus.ONGOING &&
  requestedStatus === RegistrationStatus.UPCOMING
) {
  throw new AppError(
    StatusCodes.BAD_REQUEST,
    `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
  );
}

const result=await SemesterRegistration.findByIdAndUpdate(id,payload,{
  new:true,
  runValidators:true
})
return result;

};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDb,
  getAllSemesterRegistrationFromDb,
  getSingleSemesterRegistrationFromDb,
  updateSemesterRegistrationFromDb,
};
