<template>
<div>
  <b-row>
    <b-colxx xxs="12">
        <piaf-breadcrumb :heading="$t('pages.addexchanges')"/>
      <div class="separator mb-5"></div>
    </b-colxx>
  </b-row>
  <b-row>
    <b-colxx xxs="12">

        <b-card class="mb-4" :title="$t('pages.addexchanges')" >
          
          <b-form @submit.prevent="addExchange">
            <label class="form-group has-float-label mb-4">
              <input type="text" class="form-control" v-model="exchange.exchangeName">
              <span>Exchange Name</span>
            </label>
            <label class="form-group has-float-label mb-4">
              <select class="form-control" v-model="exchange.exchangeType">
                <option value="BINANCE">
                  Binance
                </option>
              </select>
              <span>Exchange Type</span>
            </label>
            <label class="form-group has-float-label mb-4">
              <input type="text" class="form-control" v-model="exchange.apiKey">
              <span>Api Key</span>
            </label>
            <label class="form-group has-float-label mb-4">
              <input type="password" class="form-control" v-model="exchange.apiSecret">
              <span>API Secret</span>
            </label>  
            <div class="d-flex justify-content-end align-items-center">
              <b-button type="submit" variant="primary" size="lg" class="btn-shadow">Add
              </b-button>
            </div>
          </b-form>           


        </b-card>
    </b-colxx>
  </b-row>
  </div>
</template>

<script>
import {adminRoot, gConfig} from '@/constants/config';
import axios from 'axios';
import { getCurrentUser } from "@/utils";

import router from "@/router";

export default {
  data() {
    return {
      exchange: {
          "userId": getCurrentUser().id,
          "exchangeName": "",
          "exchangeType": "",
          "apiSecret": "",
          "apiKey":""
      }
    }
  },
  methods: {
    addExchange() {
      const self = this;
            
      axios.post(gConfig.PUBLIC_API_URL + '/exchange', this.exchange
      ).then(function (response) {
        if(response.data.statusCode == 200){
          
          const type = "success";
          const title = "Success !";
          const message = "Exchange Added Successfully!";
          self.$notify(type, title, message, {permanent: true});
          router.push({name: 'exchange'})

        }
      }).catch(error => {
        console.log(error)
        // console.log("test: " + error.response.data.errorMessage)
        const type = "error";
        const title = "Error";
        const message = error.data.errorMessage;
        self.$notify(type, title, message, {permanent: false});
      });
    }
  },

}
</script>
