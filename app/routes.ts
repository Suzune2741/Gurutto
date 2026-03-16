import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("components/Layout.tsx", [
    index("routes/Home.tsx"),
    route("/research", "routes/Research.tsx"),
    route("/research/:id", "routes/ShopDetailPage.tsx"),
    route("/settings", "routes/Settings.tsx"),
  ]),
] satisfies RouteConfig;
