import $http from "@/services/http";

const LOGIN_ENDPOINT = "/authenticate";
const REGISTER_ENDPOINT = "/signup";
const ACTIVATE_USER_ENDPOINT = (id) => `/user/activate?key=${id}`;
const INITIATE_FORGET_PASSWORD = "/user/reset-password/init";
const FINISH_FORGET_PASSWORD = "/user/reset-password/finish";
export default {
  loginUser(email, password) {
    return $http.post(LOGIN_ENDPOINT, {
      email: email,
      password: password,
    });
  },
  registerUser(email, password) {
    return $http.post(REGISTER_ENDPOINT, {
      email: email,
      password: password,
    });
  },
  activateUser(id) {
    return $http.post(ACTIVATE_USER_ENDPOINT(id));
  },
  initiateResetPassword(email) {
    return $http.post(INITIATE_FORGET_PASSWORD, {
      email: email,
    });
  },
  finishResetPassword(password, resetKey) {
    return $http.post(FINISH_FORGET_PASSWORD, {
      password: password,
      resetKey: resetKey,
    });
  },
};
