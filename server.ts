// src/index.js
import dotenv from "dotenv";
import { createServer } from "http";
import app from "./app";

dotenv.config();

const port = process.env.PORT || 9000; //eslint-disable-line

const server = createServer(app);

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`); //eslint-disable-line
});
