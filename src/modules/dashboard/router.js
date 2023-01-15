export const dashboardRouter = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: () =>
      import(
        /* webpackChunkName: "Main" */ "@/modules/dashboard/pages/DashboardPage"
      ),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "Dashboard" */ "@/modules/dashboard/pages/DashboardWrapper"
        ),
      requiresAuth: true,
    },
  },
];
