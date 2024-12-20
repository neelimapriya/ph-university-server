import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  Node_env:process.env.NODE_ENV,
  port: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  bcrypt_salt_round:process.env.BCRYPT_SALT_ROUNDS,
  default_pass:process.env.DEFAULT_PASS,
  jwt_access_secret:process.env.JWT_ACCESS_SECRET
};


