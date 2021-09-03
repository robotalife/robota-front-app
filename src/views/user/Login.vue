<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md="10" class="mx-auto my-auto">
      <b-card class="auth-card" no-body>
        <div class="position-relative image-side">
          <!-- <p class="text-white h2">{{ $t('dashboards.magic-is-in-the-details') }}</p>
          <p class="white mb-0">
              Please use your credentials to login.
              <br />If you are not a member, please
              <router-link tag="a" to="/user/register" class="white">register</router-link>.
          </p> -->
        </div>
        <div class="form-side">
          <router-link tag="a" to="/">
            <span class="logo-single"/>
          </router-link>
          <h6 class="mb-4">{{ $t('user.login-title') }}</h6>

          <b-form @submit.prevent="formSubmit" class="av-tooltip tooltip-label-bottom">
            <b-form-group :label="$t('user.email')" class="has-float-label mb-4">
              <b-form-input type="text" v-model="$v.form.email.$model" :state="!$v.form.email.$error"/>
              <b-form-invalid-feedback v-if="!$v.form.email.required">Please enter your email address
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-else-if="!$v.form.email.email">Please enter a valid email address
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-else-if="!$v.form.email.minLength">Your email must be minimum 4 characters
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group :label="$t('user.password')" class="has-float-label mb-4">
              <b-form-input type="password" v-model="$v.form.password.$model" :state="!$v.form.password.$error"/>
              <b-form-invalid-feedback v-if="!$v.form.password.required">Please enter your password
              </b-form-invalid-feedback>
              <br>
              <router-link tag="a" to="/user/forgot-password">{{ $t('user.forgot-password-question') }}</router-link>
            </b-form-group>
            <div class="d-flex justify-content-between align-items-center">
              <router-link tag="a" to="/user/register">Didn’t create an account ? Sign Up</router-link>
              <b-button type="submit" variant="primary" size="lg" :disabled="processing" :class="{'btn-multiple-state btn-shadow': true,
                    'show-spinner': processing,
                    'show-success': !processing && loginError===false,
                    'show-fail': !processing && loginError }">
                            <span class="spinner d-inline-block">
                                <span class="bounce1"></span>
                                <span class="bounce2"></span>
                                <span class="bounce3"></span>
                            </span>
                <span class="icon success">
                                <i class="simple-icon-check"></i>
                            </span>
                <span class="icon fail">
                                <i class="simple-icon-exclamation"></i>
                            </span>
                <span class="label">{{ $t('user.login-button') }}</span>
              </b-button>
            </div>
          </b-form>
        </div>
      </b-card>
    </b-colxx>
  </b-row>
</template>

<script>
import {
  mapGetters,
  mapActions
} from "vuex";
import {
  validationMixin
} from "vuelidate";

const {
  required,
  maxLength,
  minLength,
  email
} = require("vuelidate/lib/validators");
import axios from 'axios';
import {gConfig} from '../../constants/config';

import {setCurrentUser, getGravatarURL} from "@/utils";
import router from "@/router";
import {UserRole} from "@/utils/auth.roles";

import {adminRoot} from '../../constants/config';

export default {
  data() {
    return {
      form: {
        email: this.email || "",
        password: ""
      },
    };
  },
  props: {email},

  mixins: [validationMixin],
  validations: {
    form: {
      password: {
        required
      },
      email: {
        required,
        email,
        minLength: minLength(4)
      }
    }
  },
  computed: {
    ...mapGetters(["currentUser", "processing", "loginError"])
  },
  methods: {
    ...mapActions(["login"]),
    formSubmit() {
      const self = this;
      axios.post(gConfig.PUBLIC_API_URL + '/signin', {
        password: this.form.password,
        email: this.form.email
      }).then(function (response) {
        console.log('then called in sign in')
          if (response.data.statusCode === 200) {

            console.log('entering the 200 code')
            const type = "success";
            const title = "You have been logged in successfully!";
            const message = "You will be redirected to the dashboard !";
            self.$notify(type, title, message, {permanent: false});
            localStorage.setItem("token", response.data.token);
            const loggedInUser = {
              id: response.data.id,
              title: response.data.username,
              img: getGravatarURL('cmandesign@ymail.com'),
              date: 'Last seen today 15:24',
              role: 0
            }
            setCurrentUser(loggedInUser)
            router.push({name: 'dashboard'})
          } else {
            const type = "error";
            const title = "Error";
            const message = response.data.message;
            self.$notify(type, title, message, {permanent: false});
          }

      }).catch(error => {
        console.log('catch called in signin')
        const type = "error";
        const title = "Error";
        self.$notify(type, title, "there is a problem logging in, please try again later.", {permanent: false});
      });
    }
  },
  watch: {
    currentUser(val) {
      if (val && val.uid && val.uid.length > 0) {
        setTimeout(() => {
          this.$router.push(adminRoot);
        }, 200);
      }
    }
    ,
    loginError(val) {
      if (val != null) {
        this.$notify("error", "Login Error", val, {
          duration: 3000,
          permanent: false
        });

      }
    }
  }
}
;
</script>
