export const headerConfig = (req, res, next) => {
  res.header({
    "Content-Security-Policy":
      "default-src 'self'; connect-src 'self' https://v3.football.api-sports.io",
    "Cross-Origin-Resource-Policy": "same-origin",
    "Origin-Agent-Cluster": "?1",
    "Referrer-Policy": "no-referrer",
    "X-Content-Type-Options": "nosniff",
    "X-DNS-Prefetch-Control": "off",
  });
  next();
};
