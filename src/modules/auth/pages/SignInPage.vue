<script>
import BaseInput from "@/components/input/BaseInput.vue";
import BaseButton from "@/components/button/BaseButton.vue";
import storage from "@/utils/storage";
export default {
  name: "SignIn",
  components: {
    BaseInput,
    BaseButton,
  },
  data() {
    return {
      emailAddress: "",
      userPassword: "",
      errorMessage: "",
      snackbarColor: "pink",
      snackbar: false,
      emailRules: this.$rules.email,
      emailIsNotValid: false,
      passwordIsNotValid: false,
      emailValidation: "",
      passwordValidation: "",
    };
  },
  methods: {
    submit() {
      this.$api.auth
        .loginUser(this.emailAddress, this.userPassword)
        .then((result) => {
          storage.setItem("token", result.token);
          this.$store.commit("SET_USER", {
            id: result.id,
            email: this.emailAddress,
          });
          this.$router.push({ name: "dashboard" });
        })
        .catch((error) => {
          this.snackbar = true;
          this.errorMessage = error?.response?.data.message;
        });
    },
    changeValues(e) {
      const value = e.target.value;
      const name = e.target.name;
      const emailRegex = new RegExp(/.+@.+\..+/);
      if (name === "email") {
        if (value === "") {
          this.emailIsNotValid = true;
          this.emailValidation = "email is required";
        } else if (emailRegex.test(value)) {
          this.emailAddress = value;
          this.emailIsNotValid = false;
        } else {
          this.emailIsNotValid = true;
          this.emailValidation = "email is not valid";
        }
      } else {
        if (value === "") {
          this.passwordIsNotValid = true;
          this.passwordValidation = "password is required";
        } else {
          this.userPassword = value;
          this.passwordIsNotValid = false;
        }
      }
    },
  },
};
</script>
<template>
  <div>
    <p class="font-h-3 brand-purple fw-700">Sign In</p>
    <form class="m-t-3" @submit.prevent="submit" @change="changeValues">
      <BaseInput label="Email Address" type="email" name="email" />
      <p v-if="emailIsNotValid" class="Login__error font-12-16">
        {{ emailValidation }}
      </p>
      <div class="m-t-2">
        <BaseInput label="Password" type="password" name="password" />
        <p v-if="passwordIsNotValid" class="Login__error font-12-16">
          {{ passwordValidation }}
        </p>
      </div>

      <BaseButton class="w-1-1 m-t-3 Login--submit" text="Login" size="small" />
      <div class="d-flex m-t-4 jc-center fw-500">
        <p class="font-14-24 g-2 m-r-0-5">Forgot your password?</p>
        <RouterLink to="/forgot-password" class="Login__reset">
          Reset Password
        </RouterLink>
      </div>
      <div class="d-flex m-t-2 jc-center fw-500">
        <p class="font-14-24 g-2 m-r-0-5">
          Didn’t create an account ?
          <RouterLink to="/signup" class="Login__reset"> Sign Up </RouterLink>
        </p>
      </div>
      <v-snackbar v-model="snackbar" :right="true" :multi-line="true">
        {{ errorMessage }}
        <template v-slot:action="{ attrs }">
          <v-btn
            :color="snackbarColor"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            close
          </v-btn>
        </template>
      </v-snackbar>
    </form>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.Login {
  @include m(submit) {
    color: $white;
    background-image: $horizental;
    border-radius: 30px;

    ::v-deep .v-btn__content {
      font-size: 13px;
      line-height: 24px;
      font-weight: 700;
    }
  }

  @include e(reset) {
    color: $blue;
  }

  @include e(error) {
    color: $error;
  }
}
</style>
