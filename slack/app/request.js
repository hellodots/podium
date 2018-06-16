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

  put(url, data, params = {}) {
    return this.request("put", url, params, data);
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

  createChallenge(channelId, teamId, userId, title, metric1, metric2, metric3) {
    return this.post("challenges", {
      channelId,
      teamId,
      userId,
      title,
      metric1,
      metric2,
      metric3
    });
  }

  getChallenges(channelId, teamId, active) {
    return this.get("challenges", {
      channelId,
      teamId,
      active
    });
  }

  getActiveChallenge(channelId, teamId) {
    return this.get("active-challenge", { channelId, teamId });
  }

  updateChallenge(challengeId, channelId, teamId, active) {
    return this.put(`challenges/${challengeId}`, { channelId, teamId, active });
  }

  getLeaderboard(challengeId) {
    return this.get(`challenges/${challengeId}/leaderboard`);
  }

  createActivity(challengeId, channelId, teamId, userId, deal, metric) {
    return this.post("activities", {
      challengeId,
      channelId,
      teamId,
      userId,
      deal,
      metric
    });
  }

  getActivities(challengeId, teamId, userId) {
    return this.get("activities", {
      challengeId,
      teamId,
      userId
    });
  }

  createTeam(teamId, token, teamName) {
    return this.post("teams", {
      teamId,
      token,
      teamName
    });
  }

  getTeam(teamId) {
    return this.get(`teams/${teamId}`);
  }
}

export const apiRequestUtil = new APIRequest(axios, process.env.API_BASE);
export const requestUtil = new Request(axios);
