import { https } from "firebase-functions";
import { default as next } from "next";

const isDev = "production" !== "production";

const server = next({
  dev: isDev,
  conf: { distDir: ".next" },
});

const nextjsHandle = server.getRequestHandler();
export const nextServer = https.onRequest(async (req, res) => {
  await server.prepare();
  return await nextjsHandle(req, res);
});
