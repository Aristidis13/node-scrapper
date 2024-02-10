/* eslint-env browser */
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { siteData } from "../../../config/constants";
import { autoScroll } from "../../controllers/common";
import { IResults, ISearchParameters } from "../../interfaces-types/properties";
import { makeString } from "../../helpers/common";
import { createUrl } from "../../helpers/properties";
import { specifySelectors } from "../../helpers/browser";
import { getData } from "./xe";

puppeteer.use(StealthPlugin()); // eslint-disable-line new-cap

async function scrape(searchParams: ISearchParameters) {
  const results: IResults = {};
  const browser = await puppeteer.launch({ headless: true });

  for (const site of siteData) {
    const page = await browser.newPage();

    const id = makeString(site.id) ?? null;
    const selectors = specifySelectors(id);
    const apiUrl: string | null = id ? createUrl(searchParams, id) : null;

    if (!apiUrl || !selectors || !id) {
      // TODO throw and logError
      continue;
    }
    await page.goto(apiUrl);

    await page.setViewport({ width: 2400, height: 800 }); // prettier-ignore

    await autoScroll(page);

    await page.exposeFunction("onEvaluation", getData);

    results[id] =
      await page.evaluate(getData, selectors) ??
      `Evaluation for ${id} failed.`; // prettier-ignore
  }
  await browser.close();

  return results;
}

export default scrape;
