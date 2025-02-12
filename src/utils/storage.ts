import multer from "multer";

const storage = multer.diskStorage({
   destination(req, file, callback) {
      callback(null,'uploads/')
   },
   filename(req, file, callback) {
      callback(null, ` ${file.fieldname}-${file.originalname}`);
   },
})

export default storage;