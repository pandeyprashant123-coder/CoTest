import Redis from "ioredis";
const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
  tls: process.env.NODE_ENV === "production" ? {} : undefined,
});
export default redis;
