import Validators from "./validators";
import Strings from "./strings";

export enum ENVIRONMENT {
  development = "development",
  production = "production",
}

const isDevelopment = (): boolean => {
  const environment = ENVIRONMENT[process.env.ENVIRONMENT];
  return environment === ENVIRONMENT.development;
};

export { Strings, Validators, isDevelopment };
