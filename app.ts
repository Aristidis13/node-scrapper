import express, { NextFunction, Request, Response } from "express";
import propertiesRoutes from "./api/routes/properties/properties";
import loggingMiddleware from "./api/middleware/logger";
import bridge from "http2-express-bridge";

const app = bridge(express);

app.use(loggingMiddleware);

app.use(/^\/api\/properties\/search+$/i, propertiesRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  Error.prototype.status = 404; //eslint-disable-line
  const error = Error("Url doesn't exist");
  next(error);
});

type IError = {
  message: string;
  status: number;
};

app.use((error: IError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status ?? 500);
  res.json({
    error: {
      message: error.message ?? "No error message",
    },
  });
});

export default app;
