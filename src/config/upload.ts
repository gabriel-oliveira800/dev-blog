import { use } from "@cubos/inject";
import multer from "multer";

import { FilesService } from "../service/FilesService";

const service = use(FilesService);

const handleUploadFile = multer({
  limits: service.getFileSizeLimit(),
  fileFilter: (_, file, cb) => service.handleFileName({ file, cb }),
});

const feedHandleFiles = handleUploadFile.array("feed-pictures", 8);

export { handleUploadFile, feedHandleFiles };
