import $http from "@/services/http";

const LOGIN_ENDPOINT = "/signin";
const REGISTER_ENDPOINT = "/signup";
const ACTIVATE_USER_ENDPOINT = (id) => `/user/activate?key=${id}`;

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
};
