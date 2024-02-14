import { ISiteData } from "../api/interfaces-types/properties";

const siteIds = {
  xe: "xe",
  spitogatos: "spitogatos",
};

const siteData: ISiteData[] = [
  {
    id: siteIds.xe,
    title: "Χρυσή Ευκαιρία",
    domain: "https://www.xe.gr/",
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
];

export { siteIds, siteData };
