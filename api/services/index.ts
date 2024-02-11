/* eslint-env browser */
import { Page } from "puppeteer";
import {
  ISelectors,
  IResults,
  ISearchParameters,
} from "../interfaces-types/properties";
// import xeSearch from "./xe/search";

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

async function submitSearch(
  searchParams: ISearchParameters,
  selectors: ISelectors,
  siteId: string,
) {
  const { fieldsContainer } = selectors.groupSelectors.search;
  if (siteId === "xe") {
    return Array.from(document.querySelectorAll(fieldsContainer)).map((el) => {
      // const { } = ;
      // console.log(el.querySelector("[name][value]")?.textContent);
      return el.querySelector("[name][value]")?.textContent;
    });

    return fieldsContainer;
  }
}

export { getData, submitSearch };
