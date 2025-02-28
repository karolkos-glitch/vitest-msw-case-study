import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

const worker = setupWorker();
worker.start()
worker.use(...handlers)
