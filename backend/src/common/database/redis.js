import { createClient } from "redis";

const redisClient = createClient({
  socket: {
    host: "127.0.0.1",
    port: 6379,
  },
});

export const redisConnect = () => {
  redisClient.connect();
};

export default redisClient;
