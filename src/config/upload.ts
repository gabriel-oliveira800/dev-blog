import { Validators, getFileExtension } from "../helpers";
import multer from "multer";

type HandleFileNameCallback = {
  file: Express.Multer.File;
  cb: (error: Error, filename: string) => void;
};

const handleFileName = ({ file, cb }: HandleFileNameCallback) => {
  const filename = `${Date.now()}-${file.originalname}`;
  const fileExtension = getFileExtension(file.originalname);

  if (Validators.validateFileType(fileExtension)) {
    cb(null, filename);
  } else {
    cb(Error("Invalid file type"), null);
  }
};

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (_, file, cb) => handleFileName({ file, cb }),
});

const handleUploadFile = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 },
});

const feedHandleFiles = handleUploadFile.array("feed-pictures", 8);

export { handleUploadFile, feedHandleFiles };
