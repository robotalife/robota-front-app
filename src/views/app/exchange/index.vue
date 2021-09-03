<template>
<div>
  <b-row>
    <b-colxx xxs="12">
        <piaf-breadcrumb :heading="$t('pages.myexchanges')"/>
      <div class="separator mb-5"></div>
    </b-colxx>
  </b-row>
  <b-row>
    <b-colxx xxs="12">

        <b-card class="mb-4" :title="$t('pages.myexchanges')" >
          <router-link :to="{name: 'exchangeAdd'}" class="btn btn-dark float-right mb-3" style="margin-top:-50px">Add New Exchange </router-link>
          <table v-if="exchanges.length > 0" class="table table-striped table-hover">
            <tbody>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Exchange</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                </tr>
                <tr  v-for="(exchange, index) in exchanges" :key="index">
                    <td>
                        {{index + 1}}
                    </td>
                    <td>
                        <span>{{exchange.exchangeName}}</span>
                    </td>
                    <td>
                        <span >{{exchange.exchangeType}}</span>
                    </td>
                    <td>
                        <span class="pills" >Active</span>
                    </td>
                    <td>
                      <div class='badge badge-danger'>
                          <a @click="deleteExchangeModal(exchange)" class="icon fail">
                                <i class="simple-icon-exclamation mr-1"></i> Remove
                          </a> 
                        </div>
                    </td>
                </tr>
            </tbody>
          </table>
                          


        </b-card>

        <b-modal
      id="modal-deleteExchange"
      ref="modalExchange"
      title="Delete Exchange"
      @ok="deleteExchange"
    >
      <form ref="form" @submit.stop.prevent="deleteExchange">
        <span>To confirm you are deleting an exchange from your account, you need to enter the name of exchange in the following input (<b>{{selectedExchange.exchangeName}}</b>)</span>
        <b-form-group
          label="Enter Exchange Name"
          label-for="exchange-name-input"
          invalid-feedback="Exchange Name is required"
        >
          <b-form-input
            id="exchange-name-input"
            v-model="selectedExchangeInput"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
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
      // exchanges: [{
      //   exchangeId: "Any",
      //   userId: "Any",
      //   exchangeName: "Any",
      //   exchangeType: "Any"
      // }]
      exchanges: [],
      selectedExchange: {
            "exchangeId": "",
            "userId": "",
            "exchangeName": "",
            "exchangeType": ""
        },
      selectedExchangeInput: ""
    }
  },
  mounted: function () {
    // `this` points to the vm instance
    this.getExchangesList()
  },
  methods: {
    getExchangesList() {
      const self = this;
            
      axios.post(gConfig.PRIVATE_API_URL + '/exchange/list', {
          userId: getCurrentUser().id
        }
      ).then(function (response) {
        if(response.data.statusCode == 200){

          self.exchanges = response.data.data

        }
      }).catch(error => {
        // console.log("test: " + error.response.data.errorMessage)
        const type = "error";
        const title = "Error";
        const message = error.data.errorMessage;
        self.$notify(type, title, message, {permanent: false})
      });
    },
    deleteExchangeModal(exchange) {
      this.selectedExchange = exchange
      this.selectedExchangeInput = ""
      this.$bvModal.show('modal-deleteExchange')

    },
    deleteExchange() {
      const self = this;
      
      if(this.selectedExchangeInput != this.selectedExchange.exchangeName){

        const type = "error";
        const title = "Error";
        const message = "You should enter the exchange name correctly!";

        self.$notify(type, title, message, {permanent: false});
        return; 
        
      }


      axios.delete(gConfig.PRIVATE_API_URL + '/exchange',
      {
         data: { 'exchangeId': self.selectedExchange.exchangeId }
      }
      ).then(function (response) {
        if(response.data.statusCode == 200){
          
          const type = "success";
          const title = "Success !";
          const message = "Exchange Deleted Successfully!";
          self.$notify(type, title, message, {permanent: true});
          self.getExchangesList();

        }
      }).catch(error => {
        console.log(error)
        // console.log("test: " + error.response.data.errorMessage)
        const type = "error";
        const title = "Error";
        const message = error.data.errorMessage;
        self.$notify(type, title, message, {permanent: false});
        self.getExchangesList();
      });
    }
  },

}
</script>
