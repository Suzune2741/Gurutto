import { createRequestHandler } from "react-router";
import { Hono } from "hono";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
  }
}

const api = new Hono<{ Bindings: Env }>();

api.get("/api/research", async (c) => {
  const { lat, lng, keyword = "", range = "3" } = c.req.query();

  if (!lat || !lng) {
    return c.json({ error: "lat と lng は必須です" }, 400);
  }

  const url = new URL("https://webservice.recruit.co.jp/hotpepper/gourmet/v1/");
  url.searchParams.set("key", c.env.API_KEY);
  url.searchParams.set("lat", lat);
  url.searchParams.set("lng", lng);
  url.searchParams.set("keyword", keyword);
  url.searchParams.set("range", range);
  url.searchParams.set("format", "json");
  url.searchParams.set("count", "20");

  const res = await fetch(url.toString());
  const data = await res.json();
  console.log(url.toString());
  return c.json(data);
});

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      return api.fetch(request, env, ctx);
    }

    return requestHandler(request, {
      cloudflare: { env, ctx },
    });
  },
} satisfies ExportedHandler<Env>;
