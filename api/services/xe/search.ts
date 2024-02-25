/* eslint-env browser */
import { Page } from "puppeteer";

/**
 * Extracts from the page pagination the number of the last page
 * @param {Page} page The page that contains tha pagination
 * @returns {number} The number of the last page for the results
 */
const getMaxNumOfPages = async (page: Page): Promise<number> => {
  const numOfPagesSelector = ".results-pagination > li";

  const maxPageNumber = await page.$$eval(numOfPagesSelector, (nums) =>
    nums.reduce((currentMax: number, curEl: Element) => {
      const curElNum: number = parseInt(curEl?.textContent ?? `${0}`);
      return typeof curElNum === "number" && currentMax < curElNum
        ? curElNum
        : currentMax;
    }, 0),
  );

  return maxPageNumber;
};

export { getMaxNumOfPages };
