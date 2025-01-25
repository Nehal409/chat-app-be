const errorMiddleware = (err, req, res, next) => {
  console.log(err);
  let metaData;

  if (err.isBoom) {
    metaData = handleBoomError(err);
  } else {
    metaData = handleDefaultError(err);
  }

  res.status(+metaData.status).json({
    error: metaData,
  });

  next(); // Pass control to the next middleware if necessary
};

const handleBoomError = (err) => {
  return {
    status: +err.output.statusCode,
    message: err.message,
  };
};

const handleDefaultError = (err) => {
  return {
    status: +err.status || 500,
    message: err.message || "error.internal_server",
  };
};

// Export the middleware for ES Modules
export default errorMiddleware;
