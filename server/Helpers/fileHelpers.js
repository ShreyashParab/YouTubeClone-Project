"use strict";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname
    );
  },
});
const filefilter=(req,file,cb)=>{
  const allowedExtensions = ["mp4", "m3u8", "ts"];
  // Extract the file extension from the original filename
  const fileExtension = file.originalname.split('.').pop();
    if(allowedExtensions.includes(fileExtension.toLowerCase())){
        cb(null,true);
    }else{
        cb(null,false);
    }
}

const upload = multer({storage:storage,fileFilter:filefilter});

export default upload
