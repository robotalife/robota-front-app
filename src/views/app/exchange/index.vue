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
          <table class="table table-striped table-hover">
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
                        <span class="icon fail">
                                <i class="simple-icon-exclamation mr-1"></i> Remove
                            </span> 
                        </div>
                    </td>
                </tr>
            </tbody>
          </table>
                          


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
      // exchanges: [{
      //   exchangeId: "Any",
      //   userId: "Any",
      //   exchangeName: "Any",
      //   exchangeType: "Any"
      // }]
      exchanges: [{
            "exchangeId": "e6ad0d2c-b6f2-46c3-9040-9e7dffef5b5b",
            "userId": "75f98e57-c77e-40e0-9e15-ff02165f4c48",
            "exchangeName": "my-binance-1",
            "exchangeType": "BINANCE"
        }]
    }
  },
  mounted: function () {
    // `this` points to the vm instance
    this.getExchangesList()
  },
  methods: {
    getExchangesList() {
      const self = this;
            
      axios.post(gConfig.API_BASE_URL + '/exchange/list', {
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
        self.$notify(type, title, message, {permanent: false});
      });
    }
  },

}
</script>
