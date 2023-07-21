/**
 * Writes a debug message to the console.
 * @param {string} message
 */
const writeDebug = (message) => {
  console.debug(`[QBO Widget] ${message}`);
};

/**
 * Removes the QBO advertisement from the DOM.
 * @param {string} className CSS Class Name of the QBO advertisement.
 */
const removeAd = (className) => {
  const ad = document.querySelector(className);

  if (ad) {
    ad.remove();
  }
};

/**
 * Locates the QBO advertisement and removes it from the DOM.
 * **Note** the observer is never detached as this is a React app and pages are never reloaded.
 * @param {MutationRecord[]} mutationList
 * @param {MutationObserver} observer
 */
const adRemovalCallback = (mutationList, observer) => {
  removeAd(".marketing-ipd-tsa-widgets");
  removeAd(".explore-products-container-wrapper");
  removeAd(".card-content-qbchecking-promo");
  removeAd(".capital-loan-application-card-container");
};

// Create the observer
const adObserver = new MutationObserver(adRemovalCallback);

// Start observing the body for changes
adObserver.observe(document.body, {
  childList: true,
  subtree: true,
});
