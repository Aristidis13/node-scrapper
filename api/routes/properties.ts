/**
 * The API that will be exposed to the user
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

/* Turbo Console Log
 * CTRL + ALT + L on variable `x` -> creates console for x
 * SHIFT + ALT + C comments consoles
 * SHIFT + ALT + U uncomments consoles
 * SHIFT + ALT + D deletes consoles
 */

const router = express.Router(); //eslint-disable-line
// ---- GET
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  const params = req.params;
  res.status(200).json({
    stocks: stocks,
  });
});

export default router;
