import { createLogger, format, transports } from "winston";

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

export default logger;
