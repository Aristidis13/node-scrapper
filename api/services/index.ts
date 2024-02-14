/* eslint-env browser */
import { Page } from "puppeteer";
import {
  ISelectors,
  IResults,
  ISearchParameters,
} from "../interfaces-types/properties";

/**
 * Get the data of the first page of XE
 * @param {string} selectors The selectors for the site we want to scrape
 * @returns {IResults} : The scraped data
 */
const getData = (selectors: ISelectors): IResults => {
  const initialPageNumber = 0; // Default value
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

  const pageNumber = Array.from(
    document.querySelectorAll(selectors.groupSelectors.numOfPagesSelector),
  ).reduce((currentMax: number, currentElement: Element) => {
    const currentElementText =
      currentElement?.textContent ?? initialPageNumber.toString();
    const currentElementNumber: number = parseInt(currentElementText);
    return typeof currentElementNumber === "number" &&
      currentMax < currentElementNumber
      ? currentElementNumber
      : currentMax;
  }, initialPageNumber);

  return {
    properties: properties,
    pageNumber: pageNumber,
  };
};

async function setBrowserFields(
  searchParams: ISearchParameters,
  page: Page,
  geoIds: string[],
  siteId: string,
) {
  let selector = null;
  if (siteId === "xe") {
    selector = await page.evaluate((searchParameters) => {
      const searchParentSelector = "body form.property-search-form";
      let transaction = document
        .querySelector(`${searchParentSelector}>.property-transaction>input`)
        ?.getAttribute("value"); // prettier-ignore
      let propertyTypeValue = document
        .querySelector(`${searchParentSelector}>.property-type>input`)
        ?.getAttribute("value"); // prettier-ignore
      transaction = searchParameters?.transaction ?? "buy";
      propertyTypeValue = searchParameters?.propertyType ?? "re_residence";

      return {
        propertyType: propertyTypeValue, // ready to accept dynamic data
        transaction: transaction, // ready to accept dynamic data
      };
    }, searchParams);
  }

  return { ...selector, geoIds: geoIds };
}

export { getData, setBrowserFields };
