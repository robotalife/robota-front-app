export const portfolioRouter = [
  {
    path: "/portfolio",
    name: "dashboard",
    component: () =>
      import(
        /* webpackChunkName: "Main" */ "@/modules/portfolio/pages/PortfolioPage"
      ),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "Dashboard" */ "@/modules/portfolio/pages/PortfolioWrapper"
        ),
      requiresAuth: true,
    },
  },
];
