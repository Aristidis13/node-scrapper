/* eslint-env browser */
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { pageUrls } from "./constants";
import { Page } from "puppeteer";

// eslint-disable-next-line new-cap
puppeteer.use(StealthPlugin());

/**
 * Removes the need to write el.querySelector consistently
 * and throws errors in case the passed element doesn't select anything
 * @param {string} selector : a selector that will fetch results
 * @param {Element} el : the element
 * @returns {Element} the element that was selected
 */
const select = (selector: string, el: Element): Element | null => {
  if (!el) {
    throw new Error("select function error: Argument `el` is null");
  }
  return el ? el.querySelector(selector) : null;
};

/**
 * Scrolls to the bottom of the page programmatically
 * @param {Page} page :The page to scroll
 */
async function autoScroll(page: Page) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight = totalHeight + distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

/**
 * API Route to fetch properties for parameters from UI
 */
async function getProperties() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(pageUrls[0].url);

  await page.setViewport({
    width: 1200,
    height: 800,
  });

  await autoScroll(page);

  const results = await page.evaluate(() => {
    const propertySelector = "div.common-property-ad";
    return Array.from(document.querySelectorAll(propertySelector)).map((el) => {
      const imageUrl = el.querySelector(`${propertySelector} img`)?.src;
      const title =
        el.querySelector(`${propertySelector} .common-property-ad-title`)
          ?.textContent ?? null;
      const price =
        el.querySelector(
          `${propertySelector} .common-property-ad-price .property-ad-price`,
        )?.textContent ?? null;
      const pricePerSqm =
        el.querySelector(
          `${propertySelector} .common-property-ad-price .property-ad-price-per-sqm`,
        )?.textContent ?? null;
      const level =
        el.querySelector(`${propertySelector} .property-ad-level`)
          ?.textContent ?? null;
      const bedrooms =
        el.querySelector(
          `${propertySelector} [data-testid=property-ad-bedrooms]`,
        )?.textContent ?? null;
      const bathrooms =
        el.querySelector(
          `${propertySelector} [data-testid=property-ad-bathrooms]`,
        )?.textContent ?? null;
      const constructionYear =
        el.querySelector(
          `${propertySelector} [data-testid=property-ad-construction-year]`,
        )?.textContent ?? null;

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
  });

  await browser.close();

  return results;
}

export default getProperties;
