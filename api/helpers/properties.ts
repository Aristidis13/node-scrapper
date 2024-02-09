/* eslint-env browser */
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { siteData } from "../../config/constants";
import { autoScroll } from "../controllers/common";

puppeteer.use(StealthPlugin()); // eslint-disable-line new-cap

/**
 * API Route to fetch properties for parameters from UI
 */
async function getProperties() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(siteData[0].url);

  await page.setViewport({
    width: 1200,
    height: 800,
  });

  await autoScroll(page);

  const results = await page.evaluate(siteData[0].scrape);

  await browser.close();

  return results;
}

export default getProperties;
