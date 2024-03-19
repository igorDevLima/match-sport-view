import AuthRepository from "../repositories/AuthRepository.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authorizationHeader = await req.headers["authorization"];
    const token =
      authorizationHeader && (await authorizationHeader.split(" ")[1]);

    if (!token)
      return res.status(401).json({ error: "Access Denied! Send a token" });

    const tokenExists = await AuthRepository.findAuthorizationToken(token);;

    if (!tokenExists)
      return res.status(401).json({ error: "Access Denied! Invalid token" });

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default authMiddleware;
