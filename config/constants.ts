import { ISiteData } from "../api/interfaces-types/properties";
import getData from "../api/controllers/properties/xe";

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
    scrape: getData,
    url: "https://www.xe.gr/property/results?transaction_name=buy&item_type=re_residence&geo_place_ids[]=ChIJLe0kpZk1XhMRoIy54iy9AAQ",
  },
  {
    id: siteIds.spitogatos,
    title: "Spitogatos",
    propertySelector: "",
    domain: "https://www.spitogatos.gr/",
    scrape: getData,
    url: "https://www.spitogatos.gr/pwliseis-katoikies/patra/timi_apo-20000/timi_eos-50000/emvado_apo-20",
  },
];

export { siteIds, siteData };
