import { createAuthModule } from "./auth";
import { createPollDetailsModule } from "./poll-details";
import { createPollsModule } from "./polls";
import { createMyPollsModule } from "./my-polls";

export function createModules(http) {
  return {
    auth: createAuthModule(http),
    pollDetails: createPollDetailsModule(http),
    polls: createPollsModule(http),
    myPolls: createMyPollsModule(http)
  };
}
