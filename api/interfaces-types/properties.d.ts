import { TransactionEnum, ItemEnum } from "./common";
import { EvaluateFunc } from "puppeteer";

type NumberAsString = string;
type ArrayAsString = string; // An array that is string
type EvaluationFunction = EvaluateFunc<[]>;
type MaxSquares = string | null;
type MinSquares = string | null;
type EmptyObject = object;

interface ISearchParameters {
  [key: string]: string | null | TransactionEnum | ItemEnum | string[];
}

/**
 * Parameters that are received from UI and will be mapped to individual Urls
 */
interface IUIParameters {
  transactionName?: TransactionEnum;
  places?: string[];
  minPrice: string;
  maxPrice: string;
  minSquares?: MinSquares;
  maxSquares?: MaxSquares;
  minBedrooms?: string;
  maxBedrooms?: string;
  minBathrooms?: string;
  maxBathrooms?: string;
  item?: ItemEnum;
}

interface SelectorData {
  name: string;
  type: string;
}

interface ISiteData {
  id: string;
  title: string;
  domain: string;
  propertySelector: string;
  parametersMap: Set; // IUIParameters;
  searchForm: SelectorData[];
}

interface ISelectors {
  // Selectors that target specific elements that have specific functions - used with querySelector
  groupSelectors: {
    propertiesContainer: string; // The selector to select the container of the properties
    numOfPagesSelector: string; // The number of pages
    search: {
      fieldsContainer: string;
    };
  };
  // Selectors that used with querySelectorAll
  individualSelectors: {
    imageUrl: SelectorData;
    title: SelectorData;
    price: SelectorData;
    pricePerSqm: SelectorData;
    level: SelectorData;
    bedrooms: SelectorData;
    bathrooms: SelectorData;
    constructionYear: SelectorData;
  };
}

interface IResults {
  [key: string]: object | number | string | null;
}

type Selectors = ISelectors | null;

export {
  IUIParameters,
  SelectorData,
  ISelectors,
  Selectors,
  ISearchParameters,
  NumberAsString,
  ISiteData,
  IResults,
  MinSquares,
  MaxSquares,
};
