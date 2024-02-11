import express, { Request, Response, NextFunction } from "express";
import getProperties from "../controllers";
import { normalizeParams } from "../controllers/common";

/* Turbo Console Log
 * CTRL + ALT + L on variable `x` -> creates console for x
 * SHIFT + ALT + C comments consoles
 * SHIFT + ALT + U uncomments consoles
 * SHIFT + ALT + D deletes consoles
 */

const router = express.Router(); //eslint-disable-line
// ---- GET
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const params = normalizeParams(req.query);

  const XEData = await getProperties(params);
  res.status(200).json(XEData);
});

export default router;
