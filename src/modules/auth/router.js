export const authRouter = [
  {
    path: "/signIn",
    name: "signIn",
    component: () =>
      import(
        /* webpackChunkName: "signIn" */ "@/modules/auth/pages/SignInPage"
      ),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "Auth" */ "@/modules/auth/pages/PublicWrapper"
        ),
      requiresAuth: false,
    },
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () =>
      import(
        /* webpackChunkName: "forgetPassword" */ "@/modules/auth/pages/ForgetPasswordPage"
      ),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "Auth" */ "@/modules/auth/pages/PublicWrapper"
        ),
      requiresAuth: false,
    },
  },
  {
    path: "/forgot-password/finish",
    name: "forgot-password-finish",
    component: () =>
      import(
        /* webpackChunkName: "ChangePasswordPage" */ "@/modules/auth/pages/ChangePasswordPage"
      ),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "Auth" */ "@/modules/auth/pages/PublicWrapper"
        ),
      requiresAuth: false,
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import(
        /* webpackChunkName: "signup" */ "@/modules/auth/pages/SignupPage"
      ),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "Auth" */ "@/modules/auth/pages/PublicWrapper"
        ),
      requiresAuth: false,
    },
  },
  {
    path: "/activate",
    name: "activate",
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "Auth" */ "@/modules/auth/pages/ActivatePage"
        ),
      requiresAuth: false,
    },
  },
  {
    path: "/notification/unsubscribe",
    name: "unsubscribeViaEmail",
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "Auth" */ "@/modules/auth/pages/UnsubscribeViaEmailPage"
        ),
      requiresAuth: false,
    },
  },
];
