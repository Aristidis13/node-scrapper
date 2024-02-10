import { TransactionEnum, ItemEnum } from "./common";
import { EvaluateFunc } from "puppeteer";

type NumberAsString = string;
type ArrayAsString = string; // An array that is string
type EvaluationFunction = EvaluateFunc<[]>;
type SquaresUpperLimit = string | null;
type SquaresLowerLimit = string | null;
type EmptyObject = object;

interface ISearchParameters {
  lowerprice: NumberAsString | null;
  higherPrice: NumberAsString | null;
  transaction: TransactionEnum | null;
  leastSquares: SquaresLowerLimit;
  mostSquares: SquaresUpperLimit;
  item: ItemEnum | null;
  places: string[] | null;
}
interface ISiteData {
  id: string;
  title: string;
  domain: string;
  propertySelector: string;
  scrape: Function;
  url: string;
}

interface SelectorData {
  name: string;
  type: string;
}

interface ISelectors {
  // Selectors that target specific elements that have specific functions - used with querySelector
  groupSelectors: {
    selectorForPropertiesContainer: string; // The selector to select the container of the properties
    numOfPagesSelector: string; // The number of pages
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
  SelectorData,
  ISelectors,
  Selectors,
  ISearchParameters,
  NumberAsString,
  ISiteData,
  IResults,
  SquaresLowerLimit,
  SquaresUpperLimit,
};
