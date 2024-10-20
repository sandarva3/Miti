import type { Context } from "hono";
import { env } from "hono/adapter";
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import type { Session, User } from "lucia";
import { verifyRequestOrigin } from "lucia";

import type { AppContext } from "../context";
import type { DatabaseUserAttributes } from "./lucia-auth";

export const authMiddleware = createMiddleware<AppContext>(async (c, next) => {
  if (c.req.path.startsWith("/auth")) {
    return next();
  }
  const lucia = c.get("lucia");

  const originHeader = c.req.header("Origin") ?? c.req.header("origin");
  const hostHeader = c.req.header("Host") ?? c.req.header("X-Forwarded-Host");
  if (
    (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader, env(c).WEB_DOMAIN])) &&
    env(c).WORKER_ENV === "production" &&
    c.req.method !== "GET"
  ) {
    return new Response(null, {
      status: 403,
    });
  }

  const sessionId = getCookie(c, "session");
  if (!sessionId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { session, user } = await lucia.validateSession(sessionId);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (session?.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    c.header("Set-Cookie", sessionCookie.serialize());
  }
  c.set("user", user as User & DatabaseUserAttributes);
  c.set("session", session);
  await next();
});
