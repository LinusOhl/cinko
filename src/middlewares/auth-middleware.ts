import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "~/lib/auth";

export const authMiddleware = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({ headers });

    return await next({
      context: {
        user: session?.user,
      },
    });
  },
);
