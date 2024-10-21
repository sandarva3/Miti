import { Hono } from "hono";
import { env } from "hono/adapter";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { generateId } from "lucia";

import { authMiddleware } from "./auth/auth.middleware";
import { initializeLucia } from "./auth/lucia-auth";
import type { AppContext } from "./context";
import { AuthController } from "./controller/auth/auth.controller";
import { GoogleCalendarController } from "./controller/calendar/google-calendar.controller";
import { UserController } from "./controller/user/user.controller";
import { initalizeDB } from "./database/db";
import { installTable } from "./database/installs";
import { oauthAccountTable } from "./database/oauth.accounts";
import { userTable } from "./database/users";

// import json from "./users.json";

const app = new Hono<AppContext>();

app
  .use(logger())
  .use((c, next) => {
    const handler = cors({ origin: env(c).WEB_DOMAIN, credentials: true });
    return handler(c, next);
  })
  .use((c, next) => {
    initalizeDB(c);
    initializeLucia(c);
    return next();
  })
  .post("/installed", (c) => {
    fetch(`https://www.google-analytics.com/mp/collect?measurement_id=G-66S48YMB7K&api_secret=hkMQzGhVRJSdF1ZvmTwtBA`, {
      method: "POST",
      body: JSON.stringify({
        client_id: "xyz",
        events: [
          {
            name: "install",
          },
        ],
      }),
    });
    c.get("db")
      .insert(installTable)
      .values({
        id: "xyz",
        user: c.get("user")?.id || "anonymous",
        installedOn: Date.now(),
      });
    return c.json({ status: "ok" });
  })
  // .get("/seed", async (c) => {
  //   await Promise.all(
  //     json.map(async (item) => {
  //       const userId = await c
  //         .get("db")
  //         .insert(userTable)
  //         .values({
  //           email: item._json.email,
  //           username: item._json.name,
  //           emailVerified: item._json.email_verified ? 1 : 0,
  //           refreshToken: item.refreshToken,
  //           id: generateId(15),
  //           profilePictureUrl: item._json.picture,
  //         })
  //         .returning()
  //         .then((res) => res[0]?.id ?? "");
  //       await c.get("db").insert(oauthAccountTable).values({
  //         userId,
  //         provider: "google",
  //         providerUserId: item._json.sub,
  //       });
  //     })
  //   );

  //   return c.json(json.map((item) => item._json.name));
  // })
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
