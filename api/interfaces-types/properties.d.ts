import { EvaluateFunc } from "puppeteer";

type NumberAsString = string;
type ArrayAsString = string; // An array that is string
type EvaluationFunction = EvaluateFunc<[]>;
type MaxSquares = string | null;
type MinSquares = string | null;
type EmptyObject = object;
type Transaction = "buy" | "rent" | null;
type Property = "appartment" | "house" | "land" | null;

interface IXEAutoCompletePlaceSuggestion {
  main_text: string;
  secondary_text: string;
  place_id: string;
  name: string;
}
interface ISearchParameters {
  transaction: string; // Transaction type;
  propertyType: string; // Property;
  placesSuggestionsToSearch: string[];
}

/**
 * Parameters that are received from UI and will be mapped to individual Urls
 */
interface IUIParameters {
  transactionName?: Transaction;
  places?: string[];
  minPrice: string;
  maxPrice: string;
  minSquares?: MinSquares;
  maxSquares?: MaxSquares;
  minBedrooms?: string;
  maxBedrooms?: string;
  minBathrooms?: string;
  maxBathrooms?: string;
  item?: Property;
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
}

interface ISelectors {
  // Selectors that are used with querySelector to scrape specific field info
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
  IXEAutoCompletePlaceSuggestion,
  SelectorData,
  ISelectors,
  Selectors,
  Transaction,
  ISearchParameters,
  NumberAsString,
  ISiteData,
  IResults,
  MinSquares,
  MaxSquares,
  Property,
};
