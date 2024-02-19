var _TOAST_SELECTOR_NAME = TOAST_SELECTOR_NAME || "toast-component";

function hideToast() {
  const existed = document.querySelector(`${_TOAST_SELECTOR_NAME}`);
  if (existed) {
    existed.remove();
  }
}

function showToast(message, type) {
  if (!message) {
    return;
  }

  hideToast();

  var toastClassName = "toast-message toast-show";
  if (type) {
    toastClassName = `${toastClassName} toast-${type}`;
  }

  var temp = document.createElement("div");
  temp.id = _TOAST_SELECTOR_NAME.replace("#", "");
  temp.className = toastClassName;

  temp.innerHTML = message;
  bodySelector.appendChild(temp);

  setTimeout(() => {
    hideToast();
  }, 3000);
}
