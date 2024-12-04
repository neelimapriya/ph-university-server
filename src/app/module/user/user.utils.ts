import { TAcademicSemester } from '../academicSemeter/academicSemester.interface';
// import { StudentModelSchema } from '../students/student.model';
import { userModel } from './user.model';

const findLAstStudentId = async () => {
  const lastStudent = await userModel
    .findOne(
      {
        role: 'student',
      },
      {
        id: 1,
        _id: 0,
      },
    )
    .sort({ createdAt: -1 })
    // lean use korle faster kaj kore
    //mongoose er property
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};
// year semester code 4 digit number
export const generatedStudentId = async (payload: TAcademicSemester) => {
  // first time 0000
  let currentId = (0).toString();
  const lastStudentId = await findLAstStudentId();
  //2030 01 0001
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentSemesterYear = lastStudentId?.substring(0, 4);
  const currentSemesterCode = payload.code;
  const currentSemesterYear = payload.year;
  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentSemesterYear === currentSemesterYear
  ) {
    currentId = lastStudentId.substring(6);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};