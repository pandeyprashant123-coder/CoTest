import Queue from "bull";
const analysisQueue = new Queue("analysis", {
  redis: {
    host: process.env.UPSTASH_REDIS_REST_URL,
    port: 6379,
    password: process.env.UPSTASH_REDIS_REST_TOKEN,
    tls: process.env.NODE_ENV === "production" ? {} : undefined, // Default Redis port
  },
});
analysisQueue.on("error", (error) => {
  console.error("Redis connection error:", error);
});

export default analysisQueue;
