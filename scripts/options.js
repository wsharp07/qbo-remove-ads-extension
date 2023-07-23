/**
 * Shows an alert message for a period of time
 * @param {string} message 
 * @param {number} timeToShowMs
 */
const showAlert = (message, timeToShowMs = 1500) => {
  const alert = document.getElementById("alert");
  alert.textContent = message;
  alert.style.display = "block";
  setTimeout(() => {
    alert.textContent = "";
    alert.style.display = "none";
  }, timeToShowMs);
}

/**
 * Saves options to chrome.storage
 */
const saveOptions = async () => {
  const isMarketingEnabled =
    document.getElementById("option-marketing").checked;
  const isProductEnabled = document.getElementById("option-product").checked;
  const isCheckingEnabled = document.getElementById("option-checking").checked;
  const isLoansEnabled = document.getElementById("option-loans").checked;

  await chrome.storage.sync.set({
    isMarketingEnabled,
    isProductEnabled,
    isCheckingEnabled,
    isLoansEnabled,
  });

  showAlert("Options saved.");

  await chrome.runtime.sendMessage({
    data: {
      isMarketingEnabled,
      isProductEnabled,
      isCheckingEnabled,
      isLoansEnabled,
    },
    type: "options-saved",
  });
};

/**
 * Restores select box and checkbox state using the preferences
 */
const restoreOptions = () => {
  chrome.storage.sync.get(
    {
      isMarketingEnabled: true,
      isProductEnabled: true,
      isCheckingEnabled: true,
      isLoansEnabled: true,
    },
    (items) => {
      document.getElementById("option-marketing").checked =
        items.isMarketingEnabled;
      document.getElementById("option-product").checked =
        items.isProductEnabled;
      document.getElementById("option-checking").checked =
        items.isCheckingEnabled;
      document.getElementById("option-loans").checked = items.isLoansEnabled;
    }
  );
};

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
