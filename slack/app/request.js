import axios from "axios";

export class Request {
  constructor(client) {
    this.client = client;
  }

  request(method, url, params = {}, data = {}) {
    return new Promise(async (resolve, reject) => {
      const req = { method, url, params };

      if (data) {
        req["data"] = data;
      }

      try {
        const response = await this.client(req);
        resolve(response.data);
      } catch (error) {
        reject(error.response.data);
      }
    });
  }

  get(url, params) {
    return this.request("get", url, params, null);
  }

  post(url, data, params = {}) {
    return this.request("post", url, params, data);
  }
}

export class APIRequest extends Request {
  constructor(client, baseURL) {
    super(client);
    this.baseURL = baseURL;
  }

  request(method, url, params = {}, data = {}) {
    // Append api base url to requests
    return super.request(method, `${this.baseURL}${url}`, params, data);
  }

  createChallenge(channelId, teamId, userId, metric, duration) {
    return this.post("challenges", {
      channelId,
      teamId,
      userId,
      metric,
      duration
    });
  }

  getChallenges(channelId, teamId, active) {
    return this.get("challenges", {
      channelId,
      teamId,
      active
    });
  }

  createActivity(challengeId, teamId, userId, deal) {
    return this.post("activities", { challengeId, teamId, userId, deal });
  }

  getActivities(challengeId, teamId, userId) {
    return this.get("activities", {
      challengeId,
      teamId,
      userId
    });
  }
}

export const apiRequestUtil = new APIRequest(axios, process.env.API_BASE);
export const requestUtil = new Request(axios);
