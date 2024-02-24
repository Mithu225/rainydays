function generateOrderNumber() {
  var randomNumber = Math.floor(Math.random() * 9) + 100;
  var timestamp = Date.now();
  var orderNumber = "NOROFF-" + randomNumber + timestamp;
  return orderNumber;
}

function renderCheckout() {
  var yourcart = getValueFromStore(STORAGE_CARTS);
  var checkoutInfo = getValueFromStore(STORAGE_CHECKOUT_FORM);

  var total = 0;
  yourcart.forEach((item) => {
    total =
      (item.onSale ? item.discountedPrice : item.price) * item.quantity + total;
  });

  var newHTML = yourcart.map(
    (item) => `<div class="items-info container">
    <div class="checkout-info-left">
          <img class="img-checkout" src=${item.image.url} alt=${item.image.alt}>
        </div>
        <div class="checkout-info-center">
          <p>${item.title}</p>
          <p>x${item.quantity}</p>
        </div>
        <div class="checkout-info-right">
          <p>Total</p>
          <p>${(
            (item.onSale ? item.discountedPrice : item.price) * item.quantity
          ).toLocaleString()} NOK</p>
        </div></div>
        `
  );

  var cartSelector = document.querySelector(".items-container");
  cartSelector.innerHTML = newHTML.join("");
  var checkoutSelector = document.querySelector(".total-value");
  checkoutSelector.innerHTML = total.toLocaleString();

  var orderNumberSelector = document.querySelector(".order-number-value");
  orderNumberSelector.innerHTML = generateOrderNumber();
  var orderDateSelector = document.querySelector(".order-date-value");
  orderDateSelector.innerHTML = new Date().toDateString();
  var addressShipSelector = document.querySelector(".address-ship");
  addressShipSelector.innerHTML = `${checkoutInfo.address}, ${checkoutInfo.postalcode}, ${checkoutInfo.country}`;
}

(async function () {
  await checkCartDataBeforeEnter();
  await renderHeader("confirmation");
  await renderFooter();
  await renderCheckout();
})();

beforeUnload(() => {
  setValueToStore(STORAGE_CARTS, []);
  setValueToStore(STORAGE_CHECKOUT_FORM, {});
});
