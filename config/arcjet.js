import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ARCJET_API_KEY } from "./env.js";
const aj = arcjet({
  key: process.env.ARCJET_API_KEY,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE", "USER_AGENT:PostmanRuntime/7.29.2"],
    }),

    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});

export default aj;
