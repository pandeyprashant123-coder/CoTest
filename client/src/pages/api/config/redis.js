import Redis from "ioredis";
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
  tls: process.env.NODE_ENV === "production" ? {} : undefined,
});
export default redis;
