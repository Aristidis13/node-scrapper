/* eslint-env browser */
import { Page } from "puppeteer";
import { arrayfy, makeString } from "../helpers/common";
import { ParsedQs } from "qs";
import { ISearchParameters } from "../interfaces-types/properties"; // prettier-ignore

/**
 * Normalizes the search parameters to a string or null (if the param doesn't come from UI)
 * @param {ParsedQs} params : The parameters passed from the GET request of the URL
 * @returns {ISearchParameters} : the parameters with specific types
 */
export const normalizeParams = (params: ParsedQs): ISearchParameters => {
  console.log("🚀 ~ normalizeParams ~ params:", params);

  return Object.entries(params).reduce(
    (data, parameter) => ({
      ...data,
      parameter: arrayfy(parameter) ?? makeString(parameter),
    }),
    {},
  );
};

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
