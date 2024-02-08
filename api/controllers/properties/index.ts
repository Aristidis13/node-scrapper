/* eslint-env browser */
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { siteData } from "../../../config/constants";
import { autoScroll } from "../../controllers/common";
import { IResults, ISearchParameters } from "../../interfaces-types/properties";
import { makeString } from "../../helpers/common";
import { createUrl } from "../../helpers/properties";

puppeteer.use(StealthPlugin()); // eslint-disable-line new-cap

async function scrape(searchParams: ISearchParameters) {
  const results: IResults = {};
  const browser = await puppeteer.launch({ headless: true });

  for (const site of siteData) {
    const id = makeString(site.id) ?? JSON.stringify(site);
    const page = await browser.newPage();
    const apiUrl: string | null = createUrl(searchParams, site.id);

    if (!apiUrl) {
      continue;
    }
    await page.goto(apiUrl);

    await page.setViewport({ width: 2400, height: 800 }); // prettier-ignore

    await autoScroll(page);
    results[id] = await page.evaluate(site?.scrape) ?? `Evaluation for ${id} failed.`; // prettier-ignore
  }
  await browser.close();

  return results;
}

export default scrape;
