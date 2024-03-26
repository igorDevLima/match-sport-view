const getUserIp = (req) =>
  req.headers["x-forwarded-for"] || req.socket.remoteAddress;

export default getUserIp;
