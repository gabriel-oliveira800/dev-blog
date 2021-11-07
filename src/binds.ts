import { registerService } from "@cubos/inject";

import { AuthenticateUserService } from "./service/AuthenticateUserService";
import { FollowsService } from "./service/FollowsService";
import { UserService } from "./service/UserService";

registerService("singleton", UserService);
registerService("singleton", FollowsService);
registerService("singleton", AuthenticateUserService);
