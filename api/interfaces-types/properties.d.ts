import { TransactionEnum, ItemEnum } from "./common";
import { EvaluateFunc } from "puppeteer";

type NumberAsString = string;
type ArrayAsString = string; // An array that is string
type EvaluationFunction = EvaluateFunc<[]>;
type SquaresUpperLimit = string | null;
type SquaresLowerLimit = string | null;

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
  scrape: EvaluationFunction;
  url: string;
}

interface IResults {
  [key: string]: object | string | null;
}

export {
  ISearchParameters,
  NumberAsString,
  ISiteData,
  IResults,
  SquaresLowerLimit,
  SquaresUpperLimit,
};
