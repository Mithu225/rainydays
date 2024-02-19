function generateYourCartHTML(data) {
  var cartSelector = document.querySelector("table");

  if (!data.length) {
    cartSelector.innerHTML = `<div class="cart-empty">Your cart is empty</div>`;
    return;
  }

  var html = data.map(
    (item) => `<tr class="cart-info-row">
            <td>
              <ion-icon class="bin md icon-large hydrated remove-icon" size="large" name="trash-bin" role="img" onclick="onRemoveItem('${
                item.id
              }')"></ion-icon>
            </td>
            <td>
              <img class="product-cart-image" src="${item.image.url}" alt="${
      item.image.alt
    }">
            </td>
            <td>
							<span class='${item.onSale ? "product-price-old" : ""}'>
								${item.price}
							</span>
							${item.onSale ? "<span>" + item.discountedPrice + "</span>" : ""}
						</td>
            <td>${item.quantity}</td>
            <td>${(
              (item.onSale ? item.discountedPrice : item.price) * item.quantity
            ).toLocaleString()}</td>
          </tr>`
  );

  html.unshift(
    `<tr class="cart-info-column">
    <th></th>
    <th>Product</th>
    <th>Price</th>
    <th>Qty</th>
    <th>Total</th>
  </tr>`
  );

  var total = 0;
  data.forEach((item) => {
    total =
      (item.onSale ? item.discountedPrice : item.price) * item.quantity + total;
  });
  html.push(
    `<tfoot>
            <tr>
            <td></td>
            <td></td>
            <td></td>
              <td class="yourcart-total">Sum</td>
              <td class="yourcart-total-value">${total.toLocaleString()}</td>
            </tr>
          </tfoot>`
  );

  cartSelector.innerHTML = html.join("");
}

function onRemoveItem(productID) {
  var data = getValueFromStore(STORAGE_CARTS);
  var refreshyourcart = data.filter((item) => item.id !== productID);
  setValueToStore(STORAGE_CARTS, refreshyourcart);
  generateYourCartHTML(refreshyourcart);
  updateCartNumber();
}

function renderCheckout() {
  var data = getValueFromStore(STORAGE_CARTS);
  generateYourCartHTML(data);
}

(async function () {
  await renderHeader("checkout");
  await renderFooter();
  await renderCheckout();
})();
