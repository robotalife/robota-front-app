import $http from '@/services/http';

const LOGIN_ENDPOINT = '/v1/signin';
const REGISTER_ENDPOINT = '/v1/user';

export default {
  loginUser(email, password) {
    return $http.post(LOGIN_ENDPOINT, {
      email: email,
      password: password,
    });
  },
  registerUser(email, password) {
    return $http.post(REGISTER_ENDPOINT, {
      username: 'username',
      email: email,
      password: password,
    });
  },
  // changePassword(data) {
  //   return $http.post(CHANGE_PASSWORD_ENDPOINT, data);
  // },
  // fotgetPassword(email) {
  //   return $http.post(FORGET_PASSWORD_ENDPOINT, {
  //     email: email,
  //   });
  // },
};
