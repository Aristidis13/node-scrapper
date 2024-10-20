/* eslint-env browser */
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { siteData } from '../../config/constants';
import { IResults, ISearchParameters } from '../interfaces-types/properties';
import { makeString } from '../helpers/common';
import { getDataForPage, handleSearch } from '../services/index';

puppeteer.use(StealthPlugin()); // eslint-disable-line new-cap

async function scrape(searchParams: ISearchParameters) {
  const results: IResults = {};
  const browser = await puppeteer.launch({
    headless: true,
    waitForInitialPage: true,
    args: [`--window-size=${2200},${1600}`],
  });

  for (const site of siteData) {
    const siteId = makeString(site.id);
    const page = await browser.newPage();

    if (!siteId) {
      // TODO throw and logError
      console.error('Selectors or siteId is null'); //eslint-disable-line
      continue;
    }
    await page.goto(site.domain, { waitUntil: 'load' });
    await handleSearch(searchParams, page, siteId, results);
  }
  await browser.close();

  return results;
}

export default scrape;
