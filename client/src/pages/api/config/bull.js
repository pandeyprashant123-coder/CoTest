import Queue from "bull";
const analysisQueue = new Queue("analysis", {
  redis: {
    host: process.env.KV_REST_API_URL || "redis",
    port: 6379,
    password: process.env.KV_REST_API_TOKEN,
    tls: process.env.NODE_ENV === "production" ? {} : undefined, // Default Redis port
  },
});
analysisQueue.on("error", (error) => {
  console.error("Redis connection error:", error);
});

export default analysisQueue;
