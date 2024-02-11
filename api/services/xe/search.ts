/* eslint-env browser */
import { Page } from "puppeteer";
import { ISearchParameters } from "../../interfaces-types/properties";

const search = async (
  page: Page,
  // document: Document,
  searchParams: ISearchParameters,
) => {
  console.log("search inside XE ran");
};

export default search;
