import { ISearchParameters } from "../interfaces-types/properties";
import { siteData } from "../../config/constants";

function createUrl(
  searchParams: ISearchParameters,
  siteId: string,
): string | null {
  const site = siteData.find(({ id }) => id === siteId) ?? null;
  return site !== null
    ? "https://www.xe.gr/property/results?transaction_name=buy&item_type=re_residence&geo_place_ids[]=ChIJLe0kpZk1XhMRoIy54iy9AAQ" /* `${site.domain}/`*/
    : null;
}

export { createUrl };
