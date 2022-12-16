import $http from "@/services/http";

const DELETE_BOT_ENDPOINT = (botId) => `/bots/${botId}`;
const CREATE_BOTS_ENDPOINT = "/bots";
const FOLLOW_BOT_ENDPOINT = (botId, exchangeId) =>
  `/bots/${botId}?exchangeId=${exchangeId}`;

const BOTS_STORE_ENDPOINT = "/bots/store";

const OWN_BOTS_ENDPOINT = (exchangeId) => `/bots?exchangeId=${exchangeId}`;

export default {
  createBot(data) {
    return $http.post(CREATE_BOTS_ENDPOINT, data);
  },
  deleteBot(id) {
    return $http.delete(DELETE_BOT_ENDPOINT(id));
  },
  followBot(botId, exchangeId, overrides) {
    return $http.post(FOLLOW_BOT_ENDPOINT(botId, exchangeId), overrides, null);
  },
  getBotsInStore() {
    return $http.get(BOTS_STORE_ENDPOINT);
  },
  getOwnBots(exchangeId) {
    return $http.get(OWN_BOTS_ENDPOINT(exchangeId));
  },
};
