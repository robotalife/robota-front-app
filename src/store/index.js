import Vue from "vue";
import Vuex from "vuex";
// import storage from '@/utils/storage';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: "",
    exchangeList: [],
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      // storage.setItem('user', user);
    },
    SET_EXCHANGE_LIST(state, list) {
      state.exchangeList = list;
    },
    ADD_EXCHANGE(state, list) {
      state.exchangeList.push(list);
    },
  },
  actions: {},
});
