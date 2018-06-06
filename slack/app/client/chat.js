const { WebClient } = require("@slack/client");

export class Chat {
  constructor(chat) {
    this.chat = chat;
  }

  postEphemeral(message) {
    return this.chat.postEphemeral(message);
  }

  postMessage(message) {
    return this.chat.postMessage(message);
  }
}

const web = new WebClient(process.env.SLACK_BOT_TOKEN);
export const chatUtil = new Chat(web.chat);
