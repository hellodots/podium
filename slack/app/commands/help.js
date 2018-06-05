import { requestUtil } from "../request";

export const help = url => {
  return requestUtil.post(url, {
    text: ":wave: Need some help with Podium?"
  });
};
