<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md=10 class="mx-auto my-auto">
      <b-card class="auth-card" no-body>
        <div class="position-relative image-side ">
          <p class=" text-white h2">{{ $t('dashboards.magic-is-in-the-details') }}</p>
          <p class="white mb-0"> Please use this form to register. <br/>If you are a member, please
            <router-link tag="a" to="/user/login" class="white">login</router-link>
            .
          </p>
        </div>
        <div class="form-side">
          <router-link tag="a" to="/"><span class="logo-single"/></router-link>
          <h6 class="mb-4">{{ $t('user.register') }}</h6>
          <b-form @submit.prevent="formSubmit">
            <label class="form-group has-float-label mb-4">
              <input type="text" class="form-control" v-model="username">
              <span>{{ $t('user.username') }}</span>
            </label>
            <label class="form-group has-float-label mb-4">
              <input type="email" class="form-control" v-model="email">
              <span>{{ $t('user.email') }}</span>
            </label>
            <label class="form-group has-float-label mb-4">
              <input type="password" class="form-control" v-model="password">
              <span>{{ $t('user.password') }}</span>
            </label>
            <div class="d-flex justify-content-end align-items-center">
              <b-button type="submit" variant="primary" size="lg" class="btn-shadow">{{ $t('user.register-button') }}
              </b-button>
            </div>
          </b-form>
        </div>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>
import {adminRoot} from '../../constants/config';
import axios from 'axios';


export default {
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    formSubmit() {
      const self = this;
      console.log('form submit called', this.fullname, this.email, this.password);
      axios.post('https://ezfxka2wqh.execute-api.eu-central-1.amazonaws.com/dev/v1/user/register', {
        username: this.username,
        password: this.password,
        email: this.email
      }).then(function (response) {
        const type = "success";
        const title = "Your user has been created";
        const message = "Please use login link on left side of the card to enter the application";
        self.$notify(type, title, message, {permanent: true});
        console.log(response)
      }).catch(function (error) {
        console.log(error);
      });
    }
  }
}
</script>
