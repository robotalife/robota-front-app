import storage from "@/utils/storage";

export default async (to, from, next) => {
  const requiresAuth = to?.matched?.some((r) => r?.meta?.requiresAuth);
  const isAuthenticated = storage.getItem("token");

  if (requiresAuth) {
    if (isAuthenticated) {
      next();
    } else {
      next({ name: "signIn" });
    }
  } else {
    if (isAuthenticated) {
      next({ name: "dashboard" });
    } else {
      next();
    }
  }
};
