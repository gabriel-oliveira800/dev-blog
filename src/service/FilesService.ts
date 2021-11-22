import { Validators, isDevelopment } from "../helpers";
import fs from "fs";

type HandleFileNameCallback = {
  file: Express.Multer.File;
  cb: (error: Error, filename: string) => void;
};

export interface FileRequest {
  buffer: Buffer;
  fieldname: string;
  originalname: string;
}

export interface FilesSize {
  fileSize: number;
}

class FilesService {
  getFileExtension(fileName: string): string {
    return fileName.split(".").pop();
  }

  getFileSizeLimit(): FilesSize {
    return { fileSize: 50 * 1024 * 1024 };
  }

  handleFileName({ file, cb }: HandleFileNameCallback): void {
    const filename = this.generateFileName(file.originalname);
    const fileExtension = this.getFileExtension(file.originalname);

    if (Validators.validateFileType(fileExtension)) {
      cb(null, filename);
    } else {
      cb(Error("Invalid file type"), null);
    }
  }

  generateFileName(originalname: string): string {
    const extension = this.getFileExtension(originalname);
    const now = new Date().getTime();

    return `${now}.${extension}`;
  }

  saveFile({ originalname, buffer }: FileRequest): string | null {
    if (isDevelopment()) {
      const name = this.generateFileName(originalname);
      fs.writeFileSync(`./uploads/${name}`, buffer);

      return name;
    }

    return null;
  }

  deleteFile(fileName: string): void {
    if (!isDevelopment()) return;

    if (fs.existsSync(`./uploads/${fileName}`)) {
      fs.unlinkSync(`./uploads/${fileName}`);
    }
  }
}

export { FilesService };
