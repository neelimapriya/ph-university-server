

export type Guardian={
    fatherName:string;
    fatherOccupation:string;
    fatherContact:string;
    motherName:string;
    motherOccupation:string;
    motherContact:string;
}
export type UserName={
    
        firstName:string;
        middleName:string;
        lastName:string
    
}
export type LocalGuardian={
    name:string;
    occupation:string;
    contact:string;
    address:string
}
export type Student = {
    id:string,
    name: UserName;
    email: string;
    gender: "male"|"female";
    dateOfBirth: string;
    contactNo:string;
    emergencyContactNo:string;
    bloodGroup?:  "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
    presentAddress:string;
    permanentAddress:string;
    guardian:Guardian;
    localGuardian:LocalGuardian
    profileImage?:string;
    isActive:"active"|"blocked"
  }
  