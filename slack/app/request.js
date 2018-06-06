import axios from "axios";

export class Request {
  constructor(request) {
    this.request = request;
  }

  get(url, params = {}) {
    return this.request({
      method: "get",
      url: url,
      params: params
    });
  }

  post(url, data = {}, params = {}) {
    return this.request({
      method: "post",
      url: url,
      params: params,
      data: data
    });
  }
}

export class APIRequest extends Request {
  constructor(request, baseURL) {
    super(request);
    this.baseURL = baseURL;
  }

  get(url, params = {}) {
    return super.get(`${this.baseURL}${url}`, params);
  }

  post(url, data = {}, params = {}) {
    return super.post(`${this.baseURL}${url}`, data, params);
  }

  createChallenge(channelId, teamId, userId, metric, duration) {
    return this.post("challenge", {
      channelId,
      teamId,
      userId,
      metric,
      duration
    });
  }
}

export const apiRequestUtil = new APIRequest(axios, process.env.API_BASE);
export const requestUtil = new Request(axios);
