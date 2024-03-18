import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const authorizationHeader = await req.headers["authorization"];
    const token =
      authorizationHeader && (await authorizationHeader.split(" ")[1]);

    if (!token)
      return res.status(401).json({ error: "Access Denied! Send a token" });
    const secret = process.env.SECRET;

    const decodedToken = jwt.verify(token, secret);

    console.log(decodedToken);

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Access Denied! invalid token" });
  }
};
