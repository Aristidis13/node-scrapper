import { ISiteData } from "../api/interfaces-types/properties";

const siteIds = {
  xe: "xe",
  spitogatos: "spitogatos",
};

const siteData: ISiteData[] = [
  {
    id: siteIds.xe,
    title: "Χρυσή Ευκαιρία",
    domain: "https://www.xe.gr/property/results",
    propertySelector: ".main-content",
    parametersMap: {
      // UIParameterName : XEURLParameterName
      transaction: "transaction_name",
      item: "item_type",
      placeIds: "geo_place_ids[]",
      minPrice: "minimum_price",
      maxPrice: "maximum_price",
      minBedrooms: "minimum_bedrooms",
      maxBedrooms: "maximum_bedrooms",
    },
  },
];

export { siteIds, siteData };
