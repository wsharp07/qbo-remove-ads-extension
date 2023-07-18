/**
 * Writes a debug message to the console.
 * @param {string} message 
 */
const writeDebug = (message) => {
  console.debug(`[QBO Widget] ${message}`);
};

/**
 * Locates the QBO marketing widget and removes it from the DOM.
 * **Note** the observer is never detached as this is a React app and pages are never reloaded.
 * @param {MutationRecord[]} mutationList 
 * @param {MutationObserver} observer 
 */
const marketingWidgetCallback = (mutationList, observer) => {
	const marketingWidget = document.querySelector(".marketing-ipd-tsa-widgets");

	if (marketingWidget) {
		marketingWidget.remove();
	}
};

// Create the observer
const marketingWidgetObserver = new MutationObserver(marketingWidgetCallback);

// Start observing the body for changes
marketingWidgetObserver.observe(document.body, {
	childList: true,
	subtree: true,
});
