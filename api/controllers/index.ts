/* eslint-env browser */
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { siteData } from "../../config/constants";
import { autoScroll } from "./common";
import { IResults, ISearchParameters } from "../interfaces-types/properties";
import { makeString } from "../helpers/common";
import { specifySelectors } from "../helpers/browser";
import { getData, setBrowserFields } from "../services/index";
import { getMaxNumOfPages } from "../services/xe/search";

puppeteer.use(StealthPlugin()); // eslint-disable-line new-cap

async function scrape(searchParams: ISearchParameters) {
  const results: IResults = {};
  const browser = await puppeteer.launch({
    headless: false,
    waitForInitialPage: true,
    args: [`--window-size=${2200},${1600}`],
  });

  for (const site of siteData) {
    const siteId = makeString(site.id);
    const page = await browser.newPage();
    const selectors = specifySelectors(siteId);

    if (!selectors || !siteId) {
      // TODO throw and logError
      console.error("Selectors or siteId is null"); //eslint-disable-line
      continue;
    }

    await page.goto(site.domain, { waitUntil: "load" });

    await page.exposeFunction("onSubmitSearch", setBrowserFields);
    await page.exposeFunction("findNumOfPages", getMaxNumOfPages);
    await page.exposeFunction("onEvaluation", getData);

    await setBrowserFields(searchParams, page, siteId);

    await autoScroll(page);

    results[siteId] = await page.evaluate(getData, selectors) ?? `Evaluation for ${siteId} failed.`; // prettier-ignore

    // const numOfPages = await page.evaluate(getMaxNumOfPages, selectors);
  }
  await browser.close();

  return results;
}

export default scrape;
