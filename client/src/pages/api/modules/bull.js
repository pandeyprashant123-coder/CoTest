import Queue from "bull";
const analysisQueue = new Queue("analysis", {
  redis: {
    host: "127.0.0.1", // Redis host (localhost)
    port: 6379, // Default Redis port
  },
});
analysisQueue.on("error", (error) => {
  console.error("Redis connection error:", error);
});

export default analysisQueue;
