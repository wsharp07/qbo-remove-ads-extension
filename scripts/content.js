let options = {};

/**
 * Appends new ad types to this dictionary.
 */
const adDictionary = [
  {
    key: "marketing",
    class: "marketing-ipd-tsa-widgets",
    enabled: () => options.isMarketingEnabled,
  },
  {
    key: "product",
    class: "explore-products-container-wrapper",
    enabled: () => options.isProductEnabled,
  },
  {
    key: "checking",
    class: "card-content-qbchecking-promo",
    enabled: () => options.isCheckingEnabled,
  },
  {
    key: "loans",
    class: "capital-loan-application-card-container",
    enabled: () => options.isLoansEnabled,
  },
];

/**
 * Writes a debug message to the console.
 * @param {*} message
 */
const writeDebug = (message) => {
  console.debug('[QBO Widget]',message);
};

/**
 * Loads the options from storage.
 */
const loadOptions = async () => {
  options = await chrome.storage.sync.get(
    {
      isMarketingEnabled: true,
      isProductEnabled: true,
      isCheckingEnabled: true,
      isLoansEnabled: true,
    }
  );
};

/**
 * Locates the QBO advertisement and removes it from the DOM.
 * **Note** the observer is never detached as this is a React app and pages are never reloaded.
 * @param {MutationRecord[]} mutationList
 * @param {MutationObserver} observer
 */
const adRemovalCallback = async (mutationList, observer) => {
  for (const mutation of mutationList) {
    for (const node of mutation.addedNodes) {
      for (const ad of adDictionary) {
        if (node.classList?.contains(ad.class) && ad.enabled()) {
          node.remove();
        }
      }
    }
  }
};

// Load the options saved by the user
loadOptions();

// Create the observer
const adObserver = new MutationObserver(adRemovalCallback);

// Start observing the body for changes
adObserver.observe(document.body, {
  childList: true,
  subtree: true,
});
