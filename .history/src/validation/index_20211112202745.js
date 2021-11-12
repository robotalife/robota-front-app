import Vue from "vue";

Vue.prototype.$validate = {
  emailRules: [
    (v) => !!v || "email is required",
    (v) => /.+@.+\..+/.test(v) || "email is not valid",
  ],
  requiredRule: [(v) => !!v || "its required"],
};
