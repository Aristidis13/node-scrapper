import { ISiteData } from "../api/interfaces-types/properties";
import scrape from "../api/controllers/index";
import { createSelectorObject } from "../api/helpers/browser";

const siteIds = {
  xe: "xe",
  spitogatos: "spitogatos",
};

const siteData: ISiteData[] = [
  {
    id: siteIds.xe,
    title: "Χρυσή Ευκαιρία",
    domain: "https://www.xe.gr/property/results?",
    propertySelector: ".main-content",
    parametersMap: new Set([
      "transaction_name",
      "item_type",
      "geo_place_ids[]",
      "minimum_price",
      "maximum_price",
      "minimum_bedrooms",
      "maximum_bedrooms",
      "minimum_bathrooms",
      "maximum_bathrooms",
    ]),
    searchForm: [
      // createSelectorObject(, "value"),
      { name: "", type: "" },
      { name: "", type: "" },
    ],
  },
  // {
  //   id: siteIds.spitogatos,
  //   title: "Spitogatos",
  //   propertySelector: ".search-results__wrap-left",
  //   domain: "https://www.spitogatos.gr/",
  //   parametersMap: {},
  // },
];

export { siteIds, siteData };
