const { WebClient } = require("@slack/client");

export class Dialog {
  constructor(dialog) {
    this.dialog = dialog;
  }

  open(message) {
    return this.dialog.open(message);
  }
}

const web = new WebClient(process.env.SLACK_BOT_TOKEN);
export const dialogUtil = new Dialog(web.dialog);
