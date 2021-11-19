import storage from "@/utils/storage";

export default async (to, from, next) => {
  const requiresAuth = to?.matched?.some((r) => r?.meta?.requiresAuth);
  const isAuthenticated = storage.getItem("token");

  if (requiresAuth) {
    console.log("requires auth");
    if (isAuthenticated) {
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    console.log("else requires auth");
    if (isAuthenticated) {
      next({ name: "dashboard" });
    } else {
      next();
    }
  }
};
