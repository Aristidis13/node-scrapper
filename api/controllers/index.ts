/* eslint-env browser */
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { siteData } from "../../config/constants";
import { autoScroll } from "./common";
import { IResults, ISearchParameters } from "../interfaces-types/properties";
import { makeString } from "../helpers/common";
import { createUrl } from "../helpers/properties";
import { specifySelectors } from "../helpers/browser";
import { getData, setBrowserFields } from "../services/index";
import { setGeoIdsOfPlaces } from "../services/xe/search";

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

    // page.on("response", async (response) => {
    //   const url = response.url();
    //   if (url.startsWith("https://www.xe.gr/")) {
    //     console.log(`Response url: ${url}`);
    //     console.log(`Response url:`, JSON.stringify(response));
    //   }
    // });

    await page.goto(apiUrl, { waitUntil: "load" });

    await page.exposeFunction("searchPlaces", setGeoIdsOfPlaces);
    const placesToSearch = ["Πάτρα", "Αθήνα"];
    const geoPlaceIds = [];
    for (const place of placesToSearch) {
      geoPlaceIds.push(await page.evaluate(setGeoIdsOfPlaces, place));
    }
    const geoIds = geoPlaceIds.flat(2);

    await page.exposeFunction("onSubmitSearch", setBrowserFields);
    const searchData = await setBrowserFields(
      searchParams,
      page,
      geoIds as string[],
      id,
    );
    console.log("searchdata ", searchData);

    await page.setViewport({ width: 2400, height: 800 }); // prettier-ignore

    await autoScroll(page);

    await page.exposeFunction("onEvaluation", getData);

    results[id] = await page.evaluate(getData, selectors) ?? `Evaluation for ${id} failed.`; // prettier-ignore
  }
  await browser.close();

  return results;
}

export default scrape;
