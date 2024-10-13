/* eslint-env browser */
import { Page } from "puppeteer";
import { IPlacesOptions } from "../../interfaces-types/properties";

/**
 * Extracts from the page pagination the number of the last page
 * @param {Page} page The page that contains tha pagination
 * @returns {number} The number of the last page for the results
 */
const getMaxNumOfPages = async (page: Page): Promise<number> => {
  const maxPageNumber = await page.$$eval(".results-pagination > li", (nums) =>
    nums.reduce((currentMax: number, curEl: Element) => {
      const curElNum: number = parseInt(curEl?.textContent ?? `${0}`);
      return currentMax < curElNum ? curElNum : currentMax;
    }, 0),
  );

  return maxPageNumber;
};

/**
 * Finds all the options that are provided by XE for a specified place
 * @param {Page} page :The page to search
 * @param {string[]} places :The place that was specified by the UI
 * @returns {{ text: string, positionInList: number }[]} Array with the option text and place in list
 */
const getOptionsForPlace = async (
  page: Page,
  places: string[],
): Promise<IPlacesOptions[]> => {
  const optionSelector = `.dropdown-container .dropdown-panel-option`;
  const optionsForPlace = [];

  for (const place of places) {
    await page.type("#areaInput", place);
    await page.waitForSelector(optionSelector);

    const options = await page
      .$$eval(optionSelector, (opts) =>
        opts.map((opt, index) => ({
          text: opt.textContent || "",
          positionInList: index + 1,
        })),
      )
      .then((opts) => opts.filter((opt) => opt.text.includes(place) ?? []))
      .catch((err) => {
        console.log(`Error while specifying options ${JSON.stringify(err)}`); // eslint-disable-line
        return [];
      });

    optionsForPlace.push({
      name: place,
      options: options,
    });
    await page.type("#areaInput", "");
  }
  return optionsForPlace;
};

export { getMaxNumOfPages, getOptionsForPlace };
