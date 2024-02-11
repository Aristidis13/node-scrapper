/* eslint-env browser */
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { siteData } from "../../config/constants";
import { autoScroll } from "./common";
import { IResults, ISearchParameters } from "../interfaces-types/properties";
import { makeString } from "../helpers/common";
import { createUrl } from "../helpers/properties";
import { specifySelectors } from "../helpers/browser";
import { getData, submitSearch } from "../services/index";

puppeteer.use(StealthPlugin()); // eslint-disable-line new-cap

async function scrape(searchParams: ISearchParameters) {
  const results: IResults = {};
  const browser = await puppeteer.launch({ headless: true });

  for (const site of siteData) {
    const {
      id: siteId,
      title,
      domain,
      propertySelector,
      parametersMap,
      searchForm,
    } = site;
    const page = await browser.newPage();

    const id = makeString(siteId) ?? null;
    const selectors = specifySelectors(id);
    const apiUrl: string | null = createUrl(searchParams, id);

    if (!apiUrl || !selectors || !id) {
      // TODO throw and logError
      continue;
    }

    await page.goto(apiUrl);

    await page.exposeFunction("onSubmitSearch", submitSearch);
    // console.log(searchParams);
    const selected = await page.evaluate(
      submitSearch,
      searchParams,
      selectors,
      id,
    );
    console.log(selected);

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
