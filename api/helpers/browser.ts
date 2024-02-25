/* eslint-env browser */
/**
 * Delays the execution of the next script
 * @param {number} time :time in seconds
 * @returns {Promise} a promise that resolves after 'time' seconds
 */
function delay(time: number): Promise<never> {
  return new Promise((resolve) => {
    setTimeout(resolve, time * 1000);
  });
}

export { delay };
