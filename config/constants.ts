import { EvaluateFunc } from "puppeteer";
import getPropertiesFromXE from "../api/controllers/xe";

interface ISiteData {
  title: string;
  domain: string;
  propertySelector: string;
  scrape: EvaluateFunc<[]>;
  url: string;
}

const siteData: ISiteData[] = [
  {
    title: "Χρυσή Ευκαιρία",
    domain: "https://www.xe.gr/",
    propertySelector: ".main-content",
    scrape: getPropertiesFromXE,
    url: "https://www.xe.gr/property/results?transaction_name=buy&item_type=re_residence&geo_place_ids[]=ChIJLe0kpZk1XhMRoIy54iy9AAQ",
  },
  {
    title: "Spitogatos",
    propertySelector: "",
    domain: "https://www.spitogatos.gr/",
    scrape: getPropertiesFromXE,
    url: "https://www.spitogatos.gr/",
  },
];

export { siteData };
