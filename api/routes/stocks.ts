/**
 * Brings data that will be used for stock population
 */
import express, { Request, Response, NextFunction } from "express";

const stocks = [
  {
    id: 0,
    name: "Descr1",
  },
  {
    id: 1,
    name: "Descr2",
  },
  {
    id: 2,
    name: "Descr3",
  },
];

const router = express.Router(); //eslint-disable-line
// ---- GET
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    stocks: stocks,
  });
});

export default router;
