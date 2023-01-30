import express, { Express } from "express";
import router from "./routers";
import cors from "cors";

import { connectDb, disconnectDB } from "./config";

import { handleApplicationErrors } from "./middlewares";

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use(router)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
