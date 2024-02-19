/* eslint-env browser */
import { SelectorData, Selectors } from "../interfaces-types/properties";

/**
 * Delays the execution of the next script
 * @param {number} time :time in seconds
 * @returns {Promise} a promise that resolves after 'time' seconds
 */
function delay(time: number): Promise<never> {
  return new Promise((resolve) => {
    setTimeout(resolve, time * 1000);
  });
}

const createSelectorObject = (
  name: string,
  type: string = "textContent",
): SelectorData => ({
  name: name,
  type: type,
});

/**
 * Accepts an id and retrieves the specified Data
 * @param {string} siteId : A siteId that uniquely identifies the site
 * @returns {Selectors} : The selectors to specify the elements that have data extraction or null if no siteId matches
 */
const specifySelectors = (siteId: string | null): Selectors => {
  let propertiesContainer = null;
  switch (siteId) {
    case "xe":
      propertiesContainer = "div.common-property-ad";
      return {
        groupSelectors: {
          propertiesContainer: propertiesContainer,
          numOfPagesSelector: ".results-pagination > li",
        },
        individualSelectors: {
          imageUrl: createSelectorObject(`${propertiesContainer} img`, "src"),
          title: createSelectorObject(`${propertiesContainer} .common-property-ad-title`), // prettier-ignore
          price: createSelectorObject(`${propertiesContainer} .common-property-ad-price .property-ad-price`), // prettier-ignore
          pricePerSqm: createSelectorObject(
            `${propertiesContainer} .common-property-ad-price .property-ad-price-per-sqm`,
          ),
          level: createSelectorObject(`${propertiesContainer} .property-ad-level`), // prettier-ignore
          bedrooms: createSelectorObject(`${propertiesContainer} [data-testid=property-ad-bedrooms]`), // prettier-ignore
          bathrooms: createSelectorObject(`${propertiesContainer} [data-testid=property-ad-bathrooms]`), // prettier-ignore
          constructionYear: createSelectorObject(
            `${propertiesContainer} [data-testid=property-ad-construction-year]`,
          ),
        },
      };
    default:
      return null;
  }
};

export { createSelectorObject, specifySelectors, delay };
