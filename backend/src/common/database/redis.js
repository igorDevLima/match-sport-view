import { createClient } from "redis";

const redisClient = createClient();

export const redisConnect = () => {
  redisClient.connect();
};

export default redisClient;
