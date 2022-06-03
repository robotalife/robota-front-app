<script>
import BaseInput from "@/components/input/BaseInput.vue";
import BaseButton from "@/components/button/BaseButton.vue";
export default {
  name: "SignUp",
  components: {
    BaseInput,
    BaseButton,
  },
  data() {
    return {
      errorMessage: "",
      snackbarColor: "pink",
      snackbar: false,
      termsAndConditions: false,
      isFormValid: false,
      feildsValidation: {
        email: false,
        password: false,
        "rp-password": false,
        terms: false,
      },
      formData: {
        email: "",
        password: "",
        "rp-password": "",
      },
    };
  },
  methods: {
    submit() {
      this.$api.auth
        .registerUser(this.formData.email, this.formData.password)
        .then(() => {
          this.snackbar = true;
          this.snackbarColor = "green";
          this.errorMessage =
            "Please check your email for the activation email.";
          setTimeout(() => this.$router.push({ name: "signIn" }), 15000);
        })
        .catch((error) => {
          this.snackbar = true;
          this.errorMessage = error?.response?.data.message;
        });
    },
    changeForm() {
      // const value = e.target.value;
      // const name = e.target.name;
      // this.formData[name] = value;
    },
    validateInput(value) {
      this.feildsValidation[value.feildName] = value.validtionStatus;
      const feildsValidationStatus = Object.values(this.feildsValidation);
      feildsValidationStatus.includes(false)
        ? (this.isFormValid = false)
        : (this.isFormValid = true);
    },
  },
};
</script>
<template>
  <div>
    <p class="font-h-3 brand-purple fw-700">Sign Up</p>
    <form class="m-t-3" @submit.prevent="submit" @change="changeForm">
      <BaseInput
        label="Email Address"
        type="email"
        name="email"
        v-model="formData.email"
        rules="email"
        @validate="validateInput"
      />
      <BaseInput
        class="m-t-2"
        label="Password"
        type="password"
        name="password"
        rules="repeatPassword"
        v-model="formData.password"
        :siblingData="formData['rp-password']"
        @validate="validateInput"
      />
      <BaseInput
        class="m-t-2"
        label="Reapet Password"
        type="password"
        name="rp-password"
        rules="repeatPassword"
        v-model="formData['rp-password']"
        :siblingData="formData.password"
        @validate="validateInput"
      />

      <label class="d-flex ai-center m-t-3">
        <input
          type="checkbox"
          value="termsAndConditions"
          name="terms"
          @change="
            () => {
              this.feildsValidation.terms = !this.feildsValidation.terms;
              validateInput({
                validtionStatus: this.feildsValidation.terms,
                feildName: 'terms',
              });
            }
          "
        />
        <p class="m-l-0-5 font-text-small">
          I agree to the <a href="#" class="SignUp__link">Term & Conditions</a>
        </p>
      </label>

      <BaseButton
        class="w-1-1 m-t-3 SignUp__submit"
        text="Sign Up"
        size="small"
        :disabled="!isFormValid"
      />
      <div class="d-flex m-t-5 jc-center fw-500">
        <p class="font-14-24 g-65 m-r-0-5">
          Already have an account?
          <RouterLink to="/login" class="SignUp__reset"> Sign In </RouterLink>
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

.SignUp {
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

  @include e(reset) {
    color: $blue;
  }

  @include e(error) {
    color: $error;
  }

  @include e(link) {
    color: $blue;
  }
}
</style>
