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
    path: "*",
    redirect: "/login",
  },
];
