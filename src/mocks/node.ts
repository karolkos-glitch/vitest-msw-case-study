import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);

server.events.on("request:start", ({ request }) => {
  console.debug("MSW intercepted:", request.method, request.url);
});
