import { Hono } from "hono";
import { env } from "hono/adapter";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import { authMiddleware } from "./auth/auth.middleware";
import { initializeLucia } from "./auth/lucia-auth";
import type { AppContext } from "./context";
import { AuthController } from "./controller/auth/auth.controller";
import { GoogleCalendarController } from "./controller/calendar/google-calendar.controller";
import { UserController } from "./controller/user/user.controller";
import { initalizeDB } from "./database/db";

const app = new Hono<AppContext>();

app
  .use(logger())
  .use((c, next) => {
    const handler = cors({ origin: env(c).WEB_DOMAIN });
    return handler(c, next);
  })
  .use((c, next) => {
    initalizeDB(c);
    initializeLucia(c);
    return next();
  })
  .get("/health", (c) => {
    return c.json({ status: "ok" });
  })
  .use(authMiddleware);

const routes = app
  .route("/auth", AuthController)
  .route("/user", UserController)
  .route("/calendar/google", GoogleCalendarController);

export type AppType = typeof routes;
export default app;
