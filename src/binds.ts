import { registerService } from "@cubos/inject";

import { AuthenticateUserService } from "./service/AuthenticateUserService";

registerService("singleton", AuthenticateUserService);
