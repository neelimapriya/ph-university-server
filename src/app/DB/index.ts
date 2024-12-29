import config from '../config';
import { User_Role } from '../module/user/user.constant';
import { userModel } from '../module/user/user.model';

const SuperUser = {
  id: '001',
  email: 'neelimasultana@gmail.com',
  password: config.super_admin_pass,
  needsPasswordChange: false,

  role: User_Role.superAdmin,
  status: 'in-progress',
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  //when database is connecting, we will check are there any user who is super admin
  const isSuperAdminExist = await userModel.findOne({
    role: User_Role.superAdmin,
  });
  if (!isSuperAdminExist) {
    await userModel.create(SuperUser);
  }
};
export default seedSuperAdmin;
