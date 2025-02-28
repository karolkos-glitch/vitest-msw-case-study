import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker();

worker.use(...handlers);

worker.events.on("request:start", ({ request }) => {
  console.debug("MSW intercepted:", request.method, request.url);
});
