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
  let propertiesContainer = null;
  let searchFieldsContainer = null;
  switch (siteId) {
    case "xe":
      propertiesContainer = "div.common-property-ad";
      searchFieldsContainer = "body form.property-search-form";
      return {
        groupSelectors: {
          propertiesContainer: propertiesContainer,
          numOfPagesSelector: ".results-pagination > li",
        },
        searchFields: {
          transactionName: `${searchFieldsContainer}>.property-transaction>input`,
          placesInput: `.geo-area-content > input[name=geo_place_id]`,
          placesDropdown:
            ".dropdown-container>[data-testid=geo_place_id_dropdown_panel]>.dropdown-panel-option",
          propertyType: `${searchFieldsContainer}>.property-type>input`,
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

export { createSelectorObject, specifySelectors };
