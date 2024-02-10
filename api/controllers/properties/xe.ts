/* eslint-env browser */

import { ISelectors, IResults } from "../../interfaces-types/properties";

/**
 * Scrapes and gets the data by specifying two selectors
 * @param {string} selectorThatFetchestheContainer selector that selects the container
 * @param {string} selectorsForIndividualDataToGet :selector to target individual content that will extract text from it
 * @returns {any} the data
 */

/**
 * Get the data of the first page of XE
 * @param {string} selectors The selectors for the site we want to scrape
 * @returns {IResults} : The scraped data
 */
const getData = (selectors: ISelectors): IResults => {
  const initialPageNumber = 0; // Default value
  // TODO Log error if the selector is null
  const properties = Array.from(
    document.querySelectorAll(
      selectors.groupSelectors.selectorForPropertiesContainer,
    ),
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

export { getData, getScrapedData };
