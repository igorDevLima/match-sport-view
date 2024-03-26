const errorMiddleware = (error, req, res, next) => {
  const statusCode = error.status || 500;
  const errorMessage = error.status
    ? error.message
    : "A Internal server error occurred! Try again later";
  process.env.NODE_ENV === "development" && console.error(error);
  return res.status(statusCode).json({ error: errorMessage });
};

export default errorMiddleware;
