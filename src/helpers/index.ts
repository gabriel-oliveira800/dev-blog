import Validators from "./validators";
import Strings from "./strings";

const getFileExtension = (fileName: string): string => {
  return fileName.split(".").pop();
};

export { Strings, Validators, getFileExtension };
