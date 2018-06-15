const { WebClient } = require("@slack/client");
import { apiRequestUtil } from "../request";

export class Chat {
  static async postMessage(teamId, message) {
    let team;
    try {
      team = await apiRequestUtil.getTeam(teamId);
    } catch (error) {
      console.log(error);
      return;
    }
    const token = team.token;

    if (!token) {
      // TODO: return error somehow
      console.log("no token found error");
      return;
    }
    const web = new WebClient(token);
    return web.chat.postMessage(message);
  }

  static async postEphemeral(teamId, message) {
    let team;
    try {
      team = await apiRequestUtil.getTeam(teamId);
    } catch (error) {
      console.log(error);
      return;
    }
    const token = team.token;

    if (!token) {
      // TODO: return error somehow
      console.log("no token found error");
      return;
    }
    const web = new WebClient(token);
    return web.chat.postEphemeral(message);
  }
}
