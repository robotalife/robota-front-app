const apiEndPoints = {
  signup: "/signup",
  signin: "/user/signin",
  verifyEmail: "/user/activate?key=",
  resendVerification: "/user/resend-verification",
  resetInit: "/user/reset-password/init",
  resetFinish: "/user/reset-password/finish",
  userInfo: "/user/basic-info",
};

export default apiEndPoints;
