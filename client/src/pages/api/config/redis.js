import Redis from "ioredis";
const redis = new Redis({
  host: process.env.KV_REST_API_URL || "redis",
  port: 6379,
  token: process.env.KV_REST_API_TOKEN,
  tls: process.env.NODE_ENV === "production" ? {} : undefined,
});
export default redis;
