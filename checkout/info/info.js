function getFormValues() {
  var form = document.querySelector("#checkout-form");
  var inputs = form.querySelectorAll("input");
  var values = {};

  inputs.forEach(function (input) {
    var name = input.name;
    var value = input.value;
    values[name] = value;
  });

  return setValueToStore(STORAGE_CHECKOUT_FORM, values);
}

function validateForm() {
  var form = document.querySelector("#checkout-form");
  var inputs = form.querySelectorAll("input");
  var isValid = true;

  inputs.forEach(function (input) {
    if (input.required && !input.value.trim()) {
      input.style.borderColor = "red";
      isValid = false;
    } else {
      input.style.borderColor = "";
    }
  });

  return isValid;
}

async function onPurchase() {
  setTimeout(() => {
    getFormValues();
  });

  if (!validateForm()) {
    navigate("/checkout/confirmation");
  }
}

(async function () {
  await checkCartDataBeforeEnter();
  await renderHeader("info");
  await renderFooter();
})();
