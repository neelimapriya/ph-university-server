import config from '../../config';
import { academicSemester } from '../academicSemeter/academicSemester';
import { TStudent } from '../students/student.interface';
import { StudentModelSchema } from '../students/student.model';
import { TUser } from './user.interface';
import { userModel } from './user.model';
import { generatedStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};

  // if password is not given , use default password
  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'student';

 

  // find semester info
  const admissionSemester=await academicSemester.findById(payload.admissionSemester)
  
// console.log(admissionSemester,"userservice")
  userData.id =await generatedStudentId(admissionSemester)
  const newUser = await userModel.create(userData); //built in static method

  //   create a student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    payload.id = newUser.id; //embedding id
    payload.user = newUser._id; //reference _id
    const newStudent = await StudentModelSchema.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
