import { registerService } from "@cubos/inject";

import { AuthenticateUserService } from "./service/AuthenticateUserService";
import { FollowsService } from "./service/FollowsService";
import { FilesService } from "./service/FilesService";
import { FeedService } from "./service/FeedService";
import { UserService } from "./service/UserService";

registerService("singleton", UserService);
registerService("singleton", FilesService);
registerService("singleton", FeedService);
registerService("singleton", FollowsService);
registerService("singleton", AuthenticateUserService);
