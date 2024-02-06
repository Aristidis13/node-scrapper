/* eslint-env browser */
import { Page } from "puppeteer";

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
      }, 10);
    });
  });
}

export { autoScroll };