import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to:string,html:string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.Node_env === 'production', // true for port 465, false for other ports
    auth: {
      user: 'neelimasultana6@gmail.com',
      pass: 'kscp whnu ykyo ayua',
    },
  });

  await transporter.sendMail({
    from: 'neelimasultana6@gmail.com', // sender address
    to, // list of receivers
    subject: 'Password change', // Subject line
    text: 'Reset your password within 10 mins!', // plain text body
    html, // html body
  });
};
