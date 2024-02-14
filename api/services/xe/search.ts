/* eslint-env browser */
import { EvaluateFunc, Page } from "puppeteer";
import {
  ISearchParameters,
  IXEAutoCompletePlaceSuggestion,
} from "../../interfaces-types/properties";

export const setGeoIdsOfPlaces: EvaluateFunc<any> = async (place: string) => {
  const geoIds: string[] = [];

  const response = await fetch(
    `https://www.xe.gr/services/places/autocomplete?query=${place}&user_action=insertText&resolution=558x684`,
    {
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      method: "GET",
    },
  );
  const recommendedPlaces = await response.json();
  const placeIdsThatMatch = (recommendedPlaces ?? []).reduce(
    (placeIds: string[], somePlace: IXEAutoCompletePlaceSuggestion) => {
      if (somePlace?.main_text.includes(place) && somePlace?.place_id) {
        placeIds.push(somePlace?.place_id);
      }
      return placeIds;
    },
    [],
  );
  geoIds.push(placeIdsThatMatch);
  return geoIds.flat(2);
};
