function renderCheckout() {
  var yourcart = getValueFromStore(STORAGE_CARTS);

  var total = 0;
  yourcart.forEach((item) => {
    total =
      (item.onSale ? item.discountedPrice : item.price) * item.quantity + total;
  });

  var newHTML = yourcart.map(
    (item) => `<div class="items-info">
    <div class="checkout-info-left">
          <img class="img-checkout" src=${item.image.url} alt=${item.image.alt}>
        </div>
        <div class="checkout-info-center">
          <p>${item.title}</p>
          <p>${item.quantity}</p>
        </div>
        <div class="checkout-info-right">
          <p>Total</p>
          <p>${(
            (item.onSale ? item.discountedPrice : item.price) * item.quantity
          ).toLocaleString()}</p>
        </div></div>
        `
  );

  var cartSelector = document.querySelector(".items-container");
  cartSelector.innerHTML = newHTML.join("");
  var checkoutSelector = document.querySelector(".total-value");
  checkoutSelector.innerHTML = total.toLocaleString();
}

renderHeader().then(renderFooter).then(renderCheckout);
