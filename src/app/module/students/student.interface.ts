import { Model, Types } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  user: Types.ObjectId;
  id: string;
  password: string;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  admissionSemester:Types.ObjectId;
  academicDepartment:Types.ObjectId;
  isDeleted: boolean;
};

//for creating static
export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

// for creating instance
// export interface StudentMethods {
//   isUserExists(id: string): Promise<TStudent | null>;
// }

// export type StudentModels = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;