import { createClient } from "redis";

const redisClient = createClient({ url: "redis://redis:6379" });

export const redisConnect = () => {
  redisClient.connect();
};

export default redisClient;
