import { MESSAGES } from "../constants/messages.js";
import logger from "../utils/logger.js";

const errorMiddleware = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  let metaData;

  if (err.isBoom) {
    metaData = handleBoomError(err);
  } else {
    metaData = handleDefaultError(err);
  }

  res.status(+metaData.status).json({
    error: metaData,
  });
  next();
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
    message: err.message || MESSAGES.INTERNAL_SERVER_ERROR,
  };
};

export default errorMiddleware;
