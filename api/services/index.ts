/* eslint-env browser */
import { Page } from "puppeteer";
import { IResults, ISearchParameters } from "../interfaces-types/properties";
import {
  closeCookiesAcceptSection,
  setOptionsForPlace,
  setProperty,
  setTransaction,
} from "./xe/userActions";
import { autoScroll } from "../controllers/common";

const getDataForPage = async (page: Page): Promise<IResults> => {
  await autoScroll(page);
  const properties = await page.$$eval("div.common-property-ad", (propEls) =>
    propEls.map((el) => ({
      imageUrl: el.querySelector(`img`)?.getAttribute("src"),
      title: el.querySelector(".common-property-ad-title")?.textContent,
      price: el.querySelector('.common-property-ad-price .property-ad-price')?.textContent, // prettier-ignore
      pricePerSqm: el.querySelector(".common-property-ad-price .property-ad-price-per-sqm")?.textContent, // prettier-ignore
      level: el.querySelector(".property-ad-level")?.textContent,
      bedrooms: el.querySelector('[data-testid=property-ad-bedrooms]')?.textContent, // prettier-ignore
      bathrooms: el.querySelector('[data-testid=property-ad-bathrooms]')?.textContent, // prettier-ignore
      constructionYear: el.querySelector(`[data-testid=property-ad-construction-year]`)?.textContent, // prettier-ignore
    })),
  );

  return {
    properties: properties,
  };
};

async function setBrowserFields(
  searchParams: ISearchParameters,
  page: Page,
  siteId: string | null,
) {
  if (siteId === "xe") {
    await closeCookiesAcceptSection(page);
    await setTransaction(page, searchParams);
    await setProperty(page, searchParams);
    await setOptionsForPlace(page, searchParams.placesSuggestionsToSearch[0]);
    await autoScroll(page);
  }
}

export { getDataForPage, setBrowserFields };
