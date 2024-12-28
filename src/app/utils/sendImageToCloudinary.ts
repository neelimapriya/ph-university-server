import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import fs from 'fs'

// Configuration
cloudinary.config({
  cloud_name: config.CLOUDE_NAME,
  api_key: config.API_KEY,
  api_secret: config.API_SECRET,
});

export const sendImageToCloudinary = (imageName: string, path: string) => {
  return new Promise((resolve, reject) => {
    // Upload an image
    cloudinary.uploader.upload(
      path,
      {
        public_id: imageName,
      },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result);
        fs.unlink(path,(err)=>{
          if(err){
            console.log(err);
          }
          else{
            console.log("file deleted");
          }
        })
      },
    );
    
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });