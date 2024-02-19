/* eslint-env browser */
import { Page } from "puppeteer";
import {
  ISelectors,
  IResults,
  ISearchParameters,
} from "../interfaces-types/properties";
import { delay } from "../helpers/browser";

const getData = (selectors: ISelectors): IResults => {
  // TODO Log error if the selector is null
  const properties = Array.from(
    document.querySelectorAll(selectors.groupSelectors.propertiesContainer),
  ).map((el) => {
    return Object.entries(selectors.individualSelectors).reduce(
      (scrapedPropertyData, currentSelectorData) => {
        const [propertyIdentifier, selector] = currentSelectorData;
        const { name, type } = selector;
        return {
          ...scrapedPropertyData,
          [propertyIdentifier]: el.querySelector(name)?.[type] ?? null,
        };
      },
      {},
    );
  });

  return {
    properties: properties,
  };
};

async function setBrowserFields(
  searchParams: ISearchParameters,
  page: Page,
  siteId: string | null,
) {
  if (siteId === "xe") {
    await delay(4);
    // Click accept if button exists
    await page.evaluate(() => {
      (
        document.querySelector(
          ".qc-cmp2-summary-buttons [mode=primary]",
        ) as unknown as HTMLElement
      )?.click();
    });

    await delay(3);

    // Set transaction
    const propertyTransactionSelector = "body .header-dropdowns-container>.property-transaction"; // prettier-ignore
    const propertyTransactionInputEl = await page.$(propertyTransactionSelector); // prettier-ignore
    await propertyTransactionInputEl?.evaluate((b) => (b as unknown as HTMLElement).click()); // prettier-ignore
    const listOptionEl = await page.$(`${propertyTransactionSelector}>ul>li>[data-id=${searchParams.transaction}]`); // prettier-ignore
    await listOptionEl?.evaluate((b) => (b as unknown as HTMLElement).click()); // prettier-ignore

    await delay(4);

    // Set PropertyType
    const propertyTypeSelector = "body .header-dropdowns-container>.property-type"; // prettier-ignore
    const propertyTypeInputEl = await page.$(propertyTypeSelector);
    await propertyTypeInputEl?.evaluate((b) => (b as unknown as HTMLElement).click()); // prettier-ignore
    const optionEl = await page.$(`${propertyTypeSelector}>ul>li>[data-id=${searchParams.propertyType}]`); // prettier-ignore
    await optionEl?.evaluate((b) => (b as unknown as HTMLElement).click()); // prettier-ignore
    await delay(4);

    // Start adding places and retrieve every place from options
    const optionsSelector = `.geo-area-autocomplete-container>.dropdown-container`;
    const specifyOptionSelector = (position: number) =>
      `${optionsSelector} .dropdown-panel-option:nth-child(${position})`;
    for (const place of searchParams.placesSuggestionsToSearch) {
      await page.type("#areaInput", place);
      await delay(4);
      await page.waitForSelector(optionsSelector);

      // Get all the options that include the `place`value in their description
      const allOptions = await page.$$eval(
        `${optionsSelector} .dropdown-panel-option`,
        (options) =>
          options.map((option, index) => ({
            text: option.textContent || "",
            positionInList: index,
          })),
      );

      const options = allOptions.filter((option) => option.text.includes(place)); // prettier-ignore
      const input = await page.$("#areaInput");

      for await (const option of options) {
        const optionSelector = specifyOptionSelector(option.positionInList + 1);
        await page.waitForSelector(optionSelector);
        await delay(2);

        await page.$eval(optionSelector, (el) => (el as unknown as HTMLButtonElement)?.click()); // prettier-ignore
        // eslint-disable-next-line no-return-assign
        await input?.evaluate((el) => (el as unknown as HTMLInputElement).value = "",); // prettier-ignore
        await page.type("#areaInput", place);
        await delay(2);
      }
    }
  }
}

export { getData, setBrowserFields };
