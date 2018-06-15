const { WebClient } = require("@slack/client");
import { apiRequestUtil } from "../request";

export class Dialog {
  static async open(teamId, message) {
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
    return web.dialog.open(message);
  }
}
