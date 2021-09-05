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


      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import {adminRoot, gConfig} from '@/constants/config';
import axios from 'axios';
import {getCurrentUser} from "@/utils";

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
      const config = {
        headers: {
          "authorization": getCurrentUser().token
        }
      }
      axios.post(gConfig.PUBLIC_API_URL + '/exchange/list', {
            userId: getCurrentUser().id
          }, config
      ).then(function (response) {
        if (response.data.statusCode == 200) {

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

      if (this.selectedExchangeInput != this.selectedExchange.exchangeName) {

        const type = "error";
        const title = "Error";
        const message = "You should enter the exchange name correctly!";

        self.$notify(type, title, message, {permanent: false});
        return;

      }


      axios.delete(gConfig.PUBLIC_API_URL + '/exchange',
          {
            data: {'exchangeId': self.selectedExchange.exchangeId},
            headers: {'authorization': getCurrentUser().token}
          }
      ).then(function (response) {
        if (response.data.statusCode == 200) {

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
