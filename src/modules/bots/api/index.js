import $http from "@/services/http";

const FOLLOW_BOT_ENDPOINT = (botId, exchangeId) =>
  `/bots/${botId}?exchangeId=${exchangeId}`;

export default {
  followBot(botId, exchangeId, overrides) {
    return $http.post(FOLLOW_BOT_ENDPOINT(botId, exchangeId), overrides, null);
  },
};
