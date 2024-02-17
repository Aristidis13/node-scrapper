/* eslint-env browser */
import { Page } from "puppeteer";
import {
  ISelectors,
  IResults,
  ISearchParameters,
} from "../interfaces-types/properties";

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
  let selector = null;
  if (siteId === "xe") {
    // Click accept if button exists
    await page.evaluate(() => {
      (
        document.querySelector(
          ".qc-cmp2-summary-buttons [mode=primary]",
        ) as unknown as HTMLElement
      )?.click();
    });

    // Set transaction
    const propertyTransactionSelector = "body .header-dropdowns-container>.property-transaction"; // prettier-ignore
    const propertyTransactionInputEl = await page.$(propertyTransactionSelector); // prettier-ignore
    await propertyTransactionInputEl?.evaluate((b) => (b as unknown as HTMLElement).click()); // prettier-ignore
    const listOptionEl = await page.$(`${propertyTransactionSelector}>ul>li>[data-id=${searchParams.transaction}]`); // prettier-ignore
    await listOptionEl?.evaluate((b) => (b as unknown as HTMLElement).click()); // prettier-ignore

    // Set PropertyType
    const propertyTypeSelector = "body .header-dropdowns-container>.property-type"; // prettier-ignore
    const propertyTypeInputEl = await page.$(propertyTypeSelector);
    await propertyTypeInputEl?.evaluate((b) => (b as unknown as HTMLElement).click()); // prettier-ignore
    const optionEl = await page.$(`${propertyTypeSelector}>ul>li>[data-id=${searchParams.propertyType}]`); // prettier-ignore
    await optionEl?.evaluate((b) => (b as unknown as HTMLElement).click()); // prettier-ignore

    await page.screenshot({
      path: "./public/screenAfterPropertyClicks.png",
    });

    selector = await page.evaluate(
      async (searchParameters: ISearchParameters) => {
        const error = {};

        let placeValue = document.getElementById(`#areaInput`)?.getAttribute("value"); // prettier-ignore
        const optionsContainer = document.querySelectorAll(
          `body .geo-area-autocomplete-container>.dropdown-container>button`,
        );

        const placesToSearch = searchParameters.placesSuggestionsToSearch;

        for (let i = 0; i < placesToSearch.length; i++) {
          placeValue = placesToSearch[i]; // set a value to trigger a response of suggestions

          //   Array.from(optionsContainer).map(async (option) => {
          //     const optionText = option.querySelector("button")?.textContent;
          //     if (
          //       typeof optionText === "string" &&
          //       placesToSearch[i] /* .main_text*/
          //         .includes(optionText)
          //     ) {
          //       await page.click(
          //         `body .geo-area-autocomplete-container>.dropdown-container>button::nth-child(${i})`,
          //       );
          //     } else {
          //       throw new Error(
          //         `Unknown Error on setBrowserFields Function for optionText ${optionText}`,
          //       );
          //     }
          //   });
        }

        return {
          error: error,
          // transaction: transaction, // ready to accept dynamic data
        };
      },
      searchParams,
    );
  }

  return {
    ...selector,
  };
}

export { getData, setBrowserFields };
