<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md=10 class="mx-auto my-auto">
      <b-card class="auth-card" no-body>
        <div class="position-relative image-side ">
          <!-- <p class=" text-white h2">{{ $t('dashboards.magic-is-in-the-details') }}</p> -->
          <!-- <p class="white mb-0"> Please use this form to register. <br/>If you are a member, please
            <router-link tag="a" to="/user/login" class="white">login</router-link>
            .
          </p> -->
        </div>
        <div class="form-side">
          <!-- <router-link tag="a" to="/"><span class="logo-single"/></router-link> -->
          <h6 class="mb-4">{{ $t('user.register') }}</h6>
          <b-form @submit.prevent="registerSubmit">
            <div class="mb-5">
              Please use this form to register. <br/>If you are a member, please
            <router-link tag="a" to="/user/login">login</router-link>
            
            </div>
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
import {adminRoot, gConfig} from '../../constants/config';
import axios from 'axios';
import router from "@/router";

export default {
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    registerSubmit() {
      const self = this;
      console.log('form submit called', this.username, this.email, this.password);
      console.log('url of function is', gConfig.API_BASE_URL + '/user');
      
      let userEmail = this.email
      
      axios.post(gConfig.API_BASE_URL + '/user', {
        username: this.username,
        password: this.password,
        email: this.email
      }).then(function (response) {
        if(response.data.statusCode == 201){
        const type = "success";
        const title = "Your user has been created";
        const message = "Please use login link on left side of the card to enter the application";

        router.push({name: 'login' , params: { email: userEmail }} )
        self.$notify(type, title, message, {permanent: true});
        } else{
          console.log(error)
          const type = "error";
          const title = "Error";
          const message = response.data.errorMessage;
          self.$notify(type, title, message, {permanent: false});
        }
      }).catch(error => {
        console.log(error)
        // console.log("test: " + error.response.data.errorMessage)
        const type = "error";
        const title = "Error";
        const message = error.response.data.errorMessage;
        self.$notify(type, title, message, {permanent: false});
      });
    }
  }
}
</script>
