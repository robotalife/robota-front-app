import Vue from "vue";

const requiredFactory = (message) => {
  return (v) => !!v || message;
};
Vue.prototype.$rules = {
  email: [
    requiredFactory("email is required"),
    (v) => /.+@.+\..+/.test(v) || "email is not valid",
  ],
  required: requiredFactory("its required"),
};
