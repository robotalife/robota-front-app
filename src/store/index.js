import Vue from "vue";
import Vuex from "vuex";
import storage from "@/utils/storage";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    exchangeList: [],
    exchangeListRequestStatus: "start",
    selectedExchange: "",
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      storage.setItem("user", user);
    },
    SET_EXCHANGE_LIST(state, list) {
      state.exchangeList = list;
      storage.setItem("exchanges", list);
    },
    ADD_EXCHANGE(state, list) {
      state.exchangeList.push(list);
    },
    SET_EXCHANGE_LIST_REQUEST_STATUS(state, status) {
      state.exchangeListRequestStatus = status;
    },
    SET_SELECTED_EXCHANGE(state, selected) {
      state.selectedExchange = selected;
      storage.setItem("selectedExchange", selected);
    },
  },
  getters: {
    exchangeList: (state) => {
      return state.exchangeList;
    },
    exchangeListItem: (state) => {
      const exchanges = state.exchangeList;
      return exchanges.map((item) => {
        return {
          text: item.exchangeName,
          value: item.exchangeId,
        };
      });
    },
    selectedExchange: (state) => {
      return state.selectedExchange;
    },
    exchangeListStatus: (state) => {
      return state.exchangeListRequestStatus;
    },
  },
  actions: {},
});
