export default [
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/layouts/auth/login"),
    meta: {
      layout: () =>
        import(/* webpackChunkName: "Auth" */ "@/layouts/auth/index"),
      requiresAuth: false,
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import(/* webpackChunkName: "signup" */ "@/layouts/auth/signup"),
    meta: {
      layout: () =>
        import(/* webpackChunkName: "Auth" */ "@/layouts/auth/index"),
      requiresAuth: false,
    },
  },
  {
    path: "/",
    name: "dashboard",
    component: () =>
      import(
        /* webpackChunkName: "Main" */ "@/layouts/dashboard/components/Main"
      ),
    meta: {
      layout: () =>
        import(/* webpackChunkName: "Dashboard" */ "@/layouts/dashboard/Index"),
      requiresAuth: true,
    },
  },
  {
    path: "/settings",
    name: "settings",
    component: () =>
      import(
        /* webpackChunkName: "Settings" */ "@/layouts/dashboard/components/Settings"
      ),
    meta: {
      layout: () =>
        import(/* webpackChunkName: "Settings" */ "@/layouts/dashboard/Index"),
      requiresAuth: true,
    },
  },
  {
    path: "*",
    redirect: "/",
  },
];
