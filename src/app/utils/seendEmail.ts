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
    subject: 'Reset your password within 10 mins!', // Subject line
    text: '', // plain text body
    html, // html body
  });
};
