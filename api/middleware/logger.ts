import morgan from "morgan";
import logger from "../../config/logger";

const loggingMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  {
    stream: {
      write: (message) => {
        return logger.http(message.trim());
      },
    },
  },
);

export default loggingMiddleware;
