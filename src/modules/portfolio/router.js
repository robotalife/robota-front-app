export const portfolioRouter = [
  {
    path: "/portfolio",
    name: "portfolio",
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
