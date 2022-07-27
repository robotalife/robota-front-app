<script>
import BaseButton from "@/components/button/BaseButton.vue";
import storage from "@/utils/storage";
export default {
  name: "SignIn",
  components: {
    BaseButton,
  },
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
      errorMessage: "",
      snackbarColor: "pink",
      snackbar: false,
      isFormValid: true,
      feildsValidation: {
        email: false,
        password: false,
      },
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [(v) => !!v || "Password is required"],
      isButtonLoading: false,
    };
  },
  methods: {
    submit() {
      this.isFormValid = this.$refs.form.validate();
      if (this.isFormValid) {
        this.isButtonLoading = true;
        this.$api.auth
          .loginUser(this.formData.email, this.formData.password)
          .then((result) => {
            this.isButtonLoading = false;
            storage.setItem("token", result.token);
            this.$store.commit("SET_USER", {
              id: result.id,
              email: this.emailAddress,
            });
            this.$router.push({ name: "dashboard" });
          })
          .catch((error) => {
            this.isButtonLoading = false;
            this.snackbar = true;
            this.errorMessage = error?.response?.data.message;
          });
      }
      return false;
    },
  },
};
</script>
<template>
  <div>
    <p class="font-h-3 brand-purple fw-700">Sign In</p>
    <v-form
      ref="form"
      v-model="isFormValid"
      @submit.prevent="submit"
      class="m-t-3"
      lazy-validation
    >
      <span>E-mail</span>
      <v-text-field
        v-model="formData.email"
        class="Login__input"
        :rules="emailRules"
        required
      ></v-text-field>

      <span>Password</span>
      <v-text-field
        v-model="formData.password"
        class="m-t-2 Login__input"
        :rules="passwordRules"
        type="password"
        required
      ></v-text-field>

      <!-- <div @click="submit"> -->
      <BaseButton
        class="w-1-1 m-t-3 Login__submit"
        text="Sign In"
        size="small"
        :isLoading="isButtonLoading"
      />
    </v-form>
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
    <!-- </form> -->
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.Login {
  @include e(submit) {
    color: $white;
    background-image: $horizental;
    border-radius: 30px;

    ::v-deep .v-btn__content {
      font-size: 13px;
      line-height: 24px;
      font-weight: 700;
    }
  }

  @include e(input) {
    padding: 0px !important;
    ::v-deep {
      .v-input__slot {
        height: 48px;
        border-radius: 5px;
        border: solid 1px $dark-blue-20;
      }
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
