import {
  defineModule,
  MODULE_CONTRACT_VERSION,
  type ApplicationModule,
} from "@yutakax17/advanced-hello-world-fe-core";

import { createMessageApi } from "./api";
import { HelloWorldPage } from "./HelloWorldPage";

export function createMessagesModule(
  apiBaseUrl = "/api",
): Readonly<ApplicationModule> {
  const api = createMessageApi(apiBaseUrl);

  function MessagesPage() {
    return <HelloWorldPage api={api} />;
  }

  return defineModule({
    id: "messages",
    contractVersion: MODULE_CONTRACT_VERSION,
    routes: [{ path: "/", component: MessagesPage }],
  });
}
