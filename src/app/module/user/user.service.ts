import config from '../../config';
import { TStudent } from '../students/student.interface';
import { StudentModelSchema } from '../students/student.model';
import { TUser } from './user.interface';
import { userModel } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};

  // if password is not given , use default password
  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'student';

  


  userData.id = '9752';
  const newUser = await userModel.create(userData); //built in static method

  //   create a student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    studentData.id = newUser.id; //embedding id
    studentData.user = newUser._id; //reference _id
    const newStudent=await StudentModelSchema.create(studentData)
    return newStudent
  }
 
};

export const UserServices = {
  createStudentIntoDB,
};
