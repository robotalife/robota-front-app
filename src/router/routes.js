import { authRouter } from "@/modules/auth/router";
import { dashboardRouter } from "@/modules/dashboard/router";
import { settingsRouter } from "@/modules/settings/router";
import { smartTradeRouter } from "@/modules/smartTrade/router";
import { portfolioRouter } from "@/modules/portfolio/router";
export default [
  {
    path: "/",
    redirect: "signIn",
  },
  ...authRouter,
  ...dashboardRouter,
  ...settingsRouter,
  ...smartTradeRouter,
  ...portfolioRouter,
  {
    path: "*",
    redirect: "/",
  },
];
