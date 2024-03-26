import redisClient from "../database/redis.js";
import { TooManyRequestsError } from "../helpers/api-errors.js";
import getHeaderBearerToken from "../helpers/getHeaderBearerToken.js";
import getUserIp from "../helpers/getUserIp.js";

const limitRequest = (resource, limit = 5, getUserType = "ip") => {
  return async (req, res, next) => {
    let getUser;
    if (getUserType === "ip") getUser = getUserIp(req);

    if (getUserType === "token") getUser = getHeaderBearerToken(req);

    const key = `rate-limit-${resource}-${getUser}`;
    const requestCount = Number((await redisClient.get(key)) || 0) + 1;
    await redisClient.set(key, requestCount, { EX: 120 });

    if (requestCount > limit) {
      throw new TooManyRequestsError(
        "You have reached the maximum limit of allowed requests. Please try again later."
      );
    }
    next();
  };
};

export const limitRequestWithIp = (resource, limit) =>
  limitRequest(resource, limit);

export const limitRequestWithBearerToken = (resource, limit) =>
  limitRequest(resource, limit, "token");
