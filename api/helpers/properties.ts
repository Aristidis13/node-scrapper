import { ISearchParameters } from "../interfaces-types/properties";
import { siteData } from "../../config/constants";

function createUrl(
  searchParams: ISearchParameters,
  siteId: string,
): string | null {
  const site = siteData.find(({ id }) => id === siteId) ?? null;
  return site !== null ? `${site.domain}/` : null;
}

export { createUrl };
