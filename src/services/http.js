import axios from "axios";
import storage from "@/utils/storage";

function transformRes(res) {
  return res?.data || {};
}

class Http {
  constructor() {
    this.$http = axios.create({
      baseURL: "https://api.robotalife.com/dev",
    });
  }

  normalizeOptions(options) {
    const hasToken = storage.getItem("token");
    // console.log(hasToken.token);
    return {
      options,
      ...options,
      headers: {
        Authorization: hasToken,
      },
    };
  }

  get(endpoint, options = {}) {
    return this.$http
      .get(endpoint, this.normalizeOptions(options))
      .then(transformRes)
      .catch((error) => {
        if (error.response.status === 401) {
          storage.removeItem("token");
          window.location.reload();
        }
      });
  }

  post(endpoint, body, options = {}) {
    return this.$http
      .post(endpoint, body, this.normalizeOptions(options))
      .then(transformRes)
      .catch((error) => {
        if (error.response.status === 401) {
          storage.removeItem("token");
          window.location.reload();
        }
      });
  }

  put(endpoint, body, options = {}) {
    return this.$http
      .put(endpoint, body, this.normalizeOptions(options))
      .then(transformRes);
  }

  delete(endpoint, body, options = {}) {
    return this.$http
      .delete(endpoint, body, this.normalizeOptions(options))
      .then(transformRes);
  }
}

export default new Http();
