import { createLogger, format, transports } from "winston";
import morgan from "morgan";

const { combine, timestamp, json } = format;

const logger = createLogger({
  level: "http",
  format: combine(
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    json(),
  ),
  transports: [new transports.Console()],
});

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
