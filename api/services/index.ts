/* eslint-env browser */
import { Page } from "puppeteer";
import {
  ISelectors,
  IResults,
  ISearchParameters,
} from "../interfaces-types/properties";

const getData = (selectors: ISelectors, searchData: any): IResults => {
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
    searchData: searchData,
    properties: properties,
  };
};

async function setBrowserFields(
  searchParams: ISearchParameters,
  page: Page,
  places: string[],
  // placesToSearch: IXEAutoCompletePlaceSuggestion[],
  siteId: string | null,
) {
  let selector = null;
  if (siteId === "xe") {
    selector = await page.evaluate(
      (searchParameters, placesToSearch, page) => {
        const searchParentSelector = "body form.property-search-form";
        let transaction = document
          .querySelector(`${searchParentSelector}>.property-transaction>input`)
          ?.getAttribute("value");
        let propertyTypeValue = document
          .querySelector(`${searchParentSelector}>.property-type>input`)
          ?.getAttribute("value");
        let placeValue = document
          .querySelector(`body #areaInput`)
          ?.getAttribute("value");
        const optionsContainer = document.querySelectorAll(
          `body .geo-area-autocomplete-container>.dropdown-container>button`,
        );
        transaction = searchParameters?.transaction ?? "buy";
        propertyTypeValue = searchParameters?.propertyType ?? "re_residence";

        for (let i = 0; i < placesToSearch.length; i++) {
          placeValue = placesToSearch[i]; // set a value to trigger a response of suggestions
          setTimeout(() => null, 3000); // wait for them to be fetched

          // Add the usefull to input
          Array.from(optionsContainer).map(async (option) => {
            const optionText = option.querySelector("button")?.textContent;
            if (
              typeof optionText === "string" &&
              placesToSearch[i] /* .main_text*/
                .includes(optionText)
            ) {
              await page.click(
                `body .geo-area-autocomplete-container>.dropdown-container>button::nth-child(${i})`,
              );
            } else {
              throw new Error(
                `Unknown Error on setBrowserFields Function for optionText ${optionText}`,
              );
            }
          });
        }

        return {
          propertyType: propertyTypeValue, // ready to accept dynamic data
          transaction: transaction, // ready to accept dynamic data
        };
      },
      searchParams,
      places,
      page,
    );
  }

  return {
    ...selector,
    placesSuggestionsToSearch: places,
  };
}

export { getData, setBrowserFields };
