export default [
  {
    path: "/",
    redirect: "signIn",
    requiresAuth: false,
  },
  {
    path: "/signIn",
    name: "signIn",
    component: () =>
      import(/* webpackChunkName: "signIn" */ "@/layouts/auth/SignIn"),
    meta: {
      layout: () =>
        import(/* webpackChunkName: "Auth" */ "@/layouts/auth/index"),
      requiresAuth: false,
    },
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () =>
      import(
        /* webpackChunkName: "forgetPassword" */ "@/layouts/auth/forgetPassword"
      ),
    meta: {
      layout: () =>
        import(/* webpackChunkName: "Auth" */ "@/layouts/auth/index"),
      requiresAuth: false,
    },
  },
  {
    path: "/forgot-password/finish",
    name: "forgot-password-finish",
    component: () =>
      import(
        /* webpackChunkName: "forgetPasswordFinish" */ "@/layouts/auth/ForgetPasswordFinish"
      ),
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
      import(/* webpackChunkName: "signup" */ "@/layouts/auth/Signup"),
    meta: {
      layout: () =>
        import(/* webpackChunkName: "Auth" */ "@/layouts/auth/index"),
      requiresAuth: false,
    },
  },
  {
    path: "/activate",
    name: "activate",
    meta: {
      layout: () =>
        import(/* webpackChunkName: "Auth" */ "@/layouts/auth/Activate"),
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
