/* eslint-env browser */
import { Page } from "puppeteer";
import { delay } from "../../helpers/browser";
import { ISearchParameters } from "../../interfaces-types/properties";

/**
 * Closes banner that asks you to accept / decline cookies gathering for XE.
 * @param {Page} page The XE page
 */
const closeCookiesAcceptSection = async (page: Page) => {
  const agreeButtonSelector = ".qc-cmp2-summary-buttons [mode=primary]";
  await page.waitForSelector(agreeButtonSelector);
  await page.$eval(agreeButtonSelector, (el) => (el as unknown as HTMLElement)?.click()); // prettier-ignore
  await delay(3);
};

/**
 * Sets property field at page url: {siteData.domain}
 * @param {Page} page The page that whas the property field
 * @param {ISearchParameters} searchParams: Parameters to set rent, buy
 */
const setProperty = async (page: Page, searchParams: ISearchParameters) => {
  const propertyTypeSelector = "body .header-dropdowns-container>.property-type"; // prettier-ignore
  const propertyTypeInputEl = await page.$(propertyTypeSelector);
  await propertyTypeInputEl?.evaluate((b) => (b as unknown as HTMLElement).click()); // prettier-ignore
  const optionEl = await page.$(`${propertyTypeSelector}>ul>li>[data-id=${searchParams.propertyType}]`); // prettier-ignore
  await optionEl?.evaluate((b) => (b as unknown as HTMLElement).click()); // prettier-ignore
  await delay(4);
};

/**
 * Sets property field at page url: {siteData.domain}
 * @param {Page} page The page that whas the property field
 * @param {ISearchParameters} searchParams: Values to set for property in XE: [land: re_land, house: re_residence]
 */
const setTransaction = async (page: Page, searchParams: ISearchParameters) => {
  const propertyTransactionSelector = "body .header-dropdowns-container>.property-transaction"; // prettier-ignore
  const propertyTransactionInputEl = await page.$(propertyTransactionSelector); // prettier-ignore
  await propertyTransactionInputEl?.evaluate((b) => (b as unknown as HTMLElement).click()); // prettier-ignore
  const listOptionEl = await page.$(`${propertyTransactionSelector}>ul>li>[data-id=${searchParams.transaction}]`); // prettier-ignore
  await listOptionEl?.evaluate((b) => (b as unknown as HTMLElement).click()); // prettier-ignore
  await delay(4);
};

/**
 * 1) Add the place to search in the search input,
 * 2) wait for the options dropdown to appear,
 * 3) select one you haven't selected
 * 4) repeat until all options for the place have been selected
 * @param {Page} page The XE page
 * @param {string} place The place to Search
 */
const setOptionsForPlace = async (page: Page, place: string) => {
  // Selectors
  const optionsSelector = `.geo-area-autocomplete-container>.dropdown-container`;
  const optionSelector = `${optionsSelector} .dropdown-panel-option`;

  const input = await page.$("#areaInput");

  await page.type("#areaInput", place);
  await page.waitForSelector(optionSelector);

  const allOptions = await page
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

  for (const option of allOptions) {
    const specificOptionSelector = `${optionSelector}:nth-child(${option.positionInList})`;
    await page.waitForSelector(specificOptionSelector);
    await delay(2);

    await page.$eval(specificOptionSelector, (el) => (el as unknown as HTMLButtonElement)?.click()); // prettier-ignore
    await input?.evaluate((el) => {
      (el as unknown as HTMLInputElement).value = "";
    });
    await page.type("#areaInput", place);
  }
};

export {
  setProperty,
  setTransaction,
  closeCookiesAcceptSection,
  setOptionsForPlace,
};
