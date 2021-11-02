import { registerService } from "@cubos/inject";

import { AuthenticateUserService } from "./service/AuthenticateUserService";
import { UserService } from "./service/UserService";

registerService("singleton", UserService);
registerService("singleton", AuthenticateUserService);
