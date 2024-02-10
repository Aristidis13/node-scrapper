/* eslint-env browser */
import { SelectorData, Selectors } from "../interfaces-types/properties";

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
  let selectorForPropertiesContainer = null;
  switch (siteId) {
    case "xe":
      selectorForPropertiesContainer = "div.common-property-ad";
      return {
        groupSelectors: {
          selectorForPropertiesContainer: selectorForPropertiesContainer,
          numOfPagesSelector: ".results-pagination > li",
        },
        individualSelectors: {
          imageUrl: createSelectorObject(
            `${selectorForPropertiesContainer} img`,
            "src",
          ),
          title: createSelectorObject(`${selectorForPropertiesContainer} .common-property-ad-title`), // prettier-ignore
          price: createSelectorObject(`${selectorForPropertiesContainer} .common-property-ad-price .property-ad-price`), // prettier-ignore
          pricePerSqm: createSelectorObject(
            `${selectorForPropertiesContainer} .common-property-ad-price .property-ad-price-per-sqm`,
          ),
          level: createSelectorObject(`${selectorForPropertiesContainer} .property-ad-level`), // prettier-ignore
          bedrooms: createSelectorObject(`${selectorForPropertiesContainer} [data-testid=property-ad-bedrooms]`), // prettier-ignore
          bathrooms: createSelectorObject(`${selectorForPropertiesContainer} [data-testid=property-ad-bathrooms]`), // prettier-ignore
          constructionYear: createSelectorObject(
            `${selectorForPropertiesContainer} [data-testid=property-ad-construction-year]`,
          ),
        },
      };
    default:
      return null;
  }
};

export { specifySelectors };
