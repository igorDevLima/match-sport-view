import { UnauthorizedError } from "../helpers/api-errors.js";
import AuthRepository from "../repositories/AuthRepository.js";

const authMiddleware = async (req, res, next) => {
  const authorizationHeader = await req.headers["authorization"];
  const token =
    authorizationHeader && (await authorizationHeader.split(" ")[1]);

  if (!token) throw new UnauthorizedError("Access Denied! Send a Bearer token");

  const tokenExists = await AuthRepository.findAuthorizationToken(token);

  if (!tokenExists) throw new UnauthorizedError("Access Denied! Invalid token");

  next();
};

export default authMiddleware;
