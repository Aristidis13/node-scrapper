/* eslint-env browser */
import { Page } from "puppeteer";
import { arrayfy, makeString } from "../helpers/common";
import { ParsedQs } from "qs";
import { ISearchParameters, ItemEnum, TransactionEnum } from "../interfaces-types/properties"; // prettier-ignore

/**
 * Normalizes the search parameters to a string or null (if the param doesn't come from UI)
 * @param {ParsedQs} params : The parameters passed from the GET request of the URL
 * @returns {ISearchParameters} : the parameters with specific types
 */
export const normalizeParams = (params: ParsedQs): ISearchParameters => ({
  transaction: makeString(params?.transactionType) as unknown as TransactionEnum, // prettier-ignore
  item: makeString(params?.itemType) as unknown as ItemEnum,
  lowerprice: makeString(params?.lowerprice),
  higherPrice: makeString(params?.higherPrice),
  places: arrayfy(params?.places),
});

/**
 * Scrolls to the bottom of the page programmatically
 * @param {Page} page :The page to scroll
 */
async function autoScroll(page: Page) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight = totalHeight + distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

export { autoScroll };
