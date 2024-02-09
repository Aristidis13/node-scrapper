import { ISiteData } from "../api/interfaces-types/properties";
import getPropertiesFromXE from "../api/controllers/properties/xe";

const siteData: ISiteData[] = [
  {
    id: "xe",
    title: "Χρυσή Ευκαιρία",
    domain: "https://www.xe.gr/",
    propertySelector: ".main-content",
    scrape: getPropertiesFromXE,
    url: "https://www.xe.gr/property/results?transaction_name=buy&item_type=re_residence&geo_place_ids[]=ChIJLe0kpZk1XhMRoIy54iy9AAQ",
  },
  {
    id: "spitogatos",
    title: "Spitogatos",
    propertySelector: "",
    domain: "https://www.spitogatos.gr/",
    scrape: () => {},
    url: "https://www.spitogatos.gr/pwliseis-katoikies/patra/timi_apo-20000/timi_eos-50000/emvado_apo-20",
  },
];

export { siteData };
