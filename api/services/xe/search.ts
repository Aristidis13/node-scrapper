/* eslint-env browser */
import { ISelectors } from "../../interfaces-types/properties";

const getMaxNumOfPages = (selectorsContainer: ISelectors) => {
  const initialPageNumber = 0; // Default value

  const maxPageNumber = Array.from(
    document.querySelectorAll(
      selectorsContainer.groupSelectors.numOfPagesSelector,
    ),
  ).reduce((currentMax: number, currentElement: Element) => {
    const currentElementText =
      currentElement?.textContent ?? initialPageNumber.toString();
    const currentElementNumber: number = parseInt(currentElementText);
    return typeof currentElementNumber === "number" &&
      currentMax < currentElementNumber
      ? currentElementNumber
      : currentMax;
  }, initialPageNumber);

  return maxPageNumber;
};

export { getMaxNumOfPages };
