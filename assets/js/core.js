var API_ENDPOINT = "https://v2.api.noroff.dev/rainy-days";
var STORAGE_PRODUCTS = "products";
var STORAGE_PRODUCTID = "productID";
var STORAGE_CARTS = "carts";
var STORAGE_SELECTED_PRODUCT_QUANTITY = "selectedProductQuantity";
var FILTER_GENDERS = "filter:genders";
var FILTER_CATEGORIES = "filter:categories";
var TOAST_SELECTOR_NAME = "#toast-message";
var CART_HEADER_SELECTOR_NAME = "#your-cart-number";
var bodySelector = document.querySelector("body");
var store = {};

var BASE_URL = isLocalhost()
  ? ""
  : "https://mithu225.github.io/javascript1-THI-MINH-THU-HUYNH";

function isLocalhost() {
  return location.hostname === "localhost" || location.hostname === "127.0.0.1";
}

function renderLoading(isLoading) {
  if (isLoading) {
    var temp = document.createElement("div");
    temp.className = "spinner-container";
    temp.innerHTML = `<div class="spinner"></div>`;
    bodySelector.appendChild(temp);
  } else {
    const existed = document.querySelector(".spinner-container");
    if (existed) {
      existed.remove();
    }
  }
}

async function getAPI(url) {
  try {
    renderLoading(true);
    var respone = await fetch(url);
    var result = await respone.json();
    renderLoading(false);
    return result;
  } catch (error) {
    showToast(`Fetching is Error: ${error.message}`, "error");
  }
}

function stringifyValue(value) {
  return JSON.stringify(value);
}

function parseString(value) {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function setValueToStore(key, value) {
  store[key] = value;
  localStorage.setItem(key, stringifyValue(value));
}

function getValueFromStore(key) {
  return store[key] || parseString(localStorage.getItem(key));
}

function getValuesUniqued(values) {
  var valuesUniqued = [];
  values.forEach((item) => {
    if (!valuesUniqued.includes(item)) {
      valuesUniqued.push(item);
    }
  });

  return valuesUniqued;
}

async function updateCartNumber() {
  var carts = getValueFromStore(STORAGE_CARTS);
  var cartHeaderSelector = document.querySelector(CART_HEADER_SELECTOR_NAME);

  if (!cartHeaderSelector) {
    return;
  }

  if (!carts || !carts.length) {
    cartHeaderSelector.className = "hide";
    return;
  } else {
    cartHeaderSelector.className = "show";
  }

  var cartLength = carts
    .map((item) => item.quantity)
    .reduce((prev, cur) => prev + cur, 0);

  cartHeaderSelector.innerHTML = `<div class="your-cart-number">${cartLength}</div>`;
}

function waitForElement(selector, rootElement) {
  return new Promise((resolve) => {
    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector);
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });

    observer.observe(rootElement, {
      childList: true,
      subtree: true,
      attributeOldValue: true,
    });
  });
}

function beforeUnload(callback) {
  window.onbeforeunload = callback;
}

(function () {
  renderLoading(true);
  document.onreadystatechange = () => {
    if (document.readyState === "complete") {
      renderLoading(false);
      updateCartNumber();
    }
  };
})();
