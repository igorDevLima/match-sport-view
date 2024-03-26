const getHeaderBearerToken = async (req) => {
  const authorizationHeader = await req.headers["authorization"];
  const token =
    authorizationHeader && (await authorizationHeader.split(" ")[1]);

  return token;
};

export default getHeaderBearerToken;
