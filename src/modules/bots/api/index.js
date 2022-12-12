import $http from "@/services/http";

const CREATE_BOT_ENDPOINT = "/bots";
const FOLLOW_BOT_ENDPOINT = (botId, exchangeId) =>
  `/bots/${botId}?exchangeId=${exchangeId}`;

const MARKET_BOTS_ENDPOINT = (exchangeId) =>
  `/bots/market?exchangeId=${exchangeId}`;

const OWN_BOTS_ENDPOINT = (exchangeId) => `/bots?exchangeId=${exchangeId}`;

export default {
  createBot(data) {
    return $http.post(CREATE_BOT_ENDPOINT, data);
  },
  followBot(botId, exchangeId, overrides) {
    return $http.post(FOLLOW_BOT_ENDPOINT(botId, exchangeId), overrides, null);
  },
  getMarketBots(exchangeId) {
    return $http.get(MARKET_BOTS_ENDPOINT(exchangeId));
  },
  getOwnBots(exchangeId) {
    return $http.get(OWN_BOTS_ENDPOINT(exchangeId));
  },
};
