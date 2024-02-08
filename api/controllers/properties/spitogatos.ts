/* eslint-env browser */
/**
 * Get the data of the first page of XE
 * @returns {TProperty} : The scraped data
 */
const getData = () => {
  // Selectors
  const propertySelector = "div.common-property-ad";
  const imageUrlSelector = `${propertySelector} img`;
  const titleSelector = `${propertySelector} .common-property-ad-title`;
  const priceSelector = `${propertySelector} .common-property-ad-price .property-ad-price`;
  const pricePerSqmSelector = `${propertySelector} .common-property-ad-price .property-ad-price-per-sqm`;
  const levelSelector = `${propertySelector} .property-ad-level`;
  const bedroomsSelector = `${propertySelector} [data-testid=property-ad-bedrooms]`;
  const bathroomsSelector = `${propertySelector} [data-testid=property-ad-bathrooms]`;
  const constructionYearSelector = `${propertySelector} [data-testid=property-ad-construction-year]`;

  const pageNumbersSelector = ".results-pagination > li";
  const initialPageNumber = 0; // Default value

  const properties = Array.from(
    document.querySelectorAll(propertySelector),
  ).map((el) => {
    const imageUrl = el.querySelector(imageUrlSelector)?.src ?? null;
    const title = el.querySelector(titleSelector)?.textContent ?? null;
    const price = el.querySelector(priceSelector)?.textContent ?? null;
    const pricePerSqm = el.querySelector(pricePerSqmSelector)?.textContent ?? null; // prettier-ignore
    const level = el.querySelector(levelSelector)?.textContent ?? null;
    const bedrooms = el.querySelector(bedroomsSelector)?.textContent ?? null;
    const bathrooms = el.querySelector(bathroomsSelector)?.textContent ?? null; // prettier-ignore
    const constructionYear = el.querySelector(constructionYearSelector)?.textContent ?? null; // prettier-ignore

    return {
      imageUrl: imageUrl,
      title: title,
      price: price,
      pricePerSqm: pricePerSqm,
      level: level,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      constructionYear: constructionYear,
    };
  });

  const pageNumber = Array.from(
    document.querySelectorAll(pageNumbersSelector),
  ).reduce((currentMax: number, currentElement: Element) => {
    const currentElementText =
      currentElement?.textContent ?? initialPageNumber.toString();
    const currentElementNumber: number = parseInt(currentElementText);
    return typeof currentElementNumber === "number" &&
      currentMax < currentElementNumber
      ? currentElementNumber
      : currentMax;
  }, initialPageNumber);

  return {
    properties: properties,
    pageNumber: pageNumber,
  };
};

export default getData;
