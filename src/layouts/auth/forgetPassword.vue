<script>
import BaseInput from '@/components/input/BaseInput.vue';
import BaseButton from '@/components/button/BaseButton.vue';
export default {
  name: 'ForgetPassword',
  components: {
    BaseInput,
    BaseButton,
  },
  data() {
    return {
      emailAddress: '',
      errorMessage: '',
      snackbarColor: 'pink',
      snackbar: false,
      emailRules: this.$validate.emailRules,
      emailIsNotValid: false,
      emailValidation: '',
    };
  },
  methods: {
    submit() {
      this.$api.auth
        .fotgetPassword(this.emailAddress)
        .then((res) => {
          if (res) {
            this.errorMessage = `Rest Password link, sent to ${this.emailAddress}`;
            this.snackbarColor = 'green';
            this.snackbar = true;
          } else {
            this.snackbar = true;
            this.errorMessage = 'User not found';
          }
        })
        .catch((error) => {
          console.log(error, 'er');
          this.snackbar = true;
          this.errorMessage = error?.response?.data;
        });
    },
    changeValues(e) {
      const value = e.target.value;
      const emailRegex = new RegExp(/.+@.+\..+/);
      if (value === '') {
        this.emailIsNotValid = true;
        this.emailValidation = 'email is required';
      } else if (emailRegex.test(value)) {
        this.emailAddress = value;
        this.emailIsNotValid = false;
      } else {
        this.emailIsNotValid = true;
        this.emailValidation = 'email is not valid';
      }
    },
  },
};
</script>
<template>
  <form @submit.prevent="submit" @change="changeValues">
    <p class="m-t-5 g-100 font-29-48 fw-900 m-b-0">Reset Password</p>
    <BaseInput label="Email" type="email" name="email" />
    <p v-if="emailIsNotValid" class="ForgetPassword__error font-12-16">
      {{ emailValidation }}
    </p>

    <BaseButton
      class="w-1-1 m-t-3 bg-primary ForgetPassword__submit"
      text="Reset Password"
      size="small"
    />
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
</template>

<style scoped lang="scss">
@import '@/styles/global/color';
@import '@/styles/utils/bem';

.ForgetPassword {
  @include e(submit) {
    color: $white;
  }

  @include e(error) {
    color: $error;
  }
}
</style>
