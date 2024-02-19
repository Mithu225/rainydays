function generateYourCartHTML(data) {
  var cartSelector = document.querySelector("table");

  if (!data || !data.length) {
    cartSelector.innerHTML = `<div class="cart-empty">Your cart is empty</div>`;
    return;
  }

  var html = data
    .map(
      (item) => `
    <tr>
        <td>
          <img class="product-cart-image" src="${item.image.url}" alt="${
        item.image.alt
      }">
          <p>${item.title}</p>
        </td>
        <td><span class='${item.onSale ? "product-price-old" : ""}'>
      ${item.price}
    </span>
    ${item.onSale ? "<span>" + item.discountedPrice + "</span>" : ""}</td>
        <td>${item.quantity}</td>
        <td>${(
          (item.onSale ? item.discountedPrice : item.price) * item.quantity
        ).toLocaleString()}
        <ion-icon class="bin md icon-large hydrated remove-icon" size="large" name="trash-bin" role="img" onclick="onRemoveItem('${
          item.id
        }')"></ion-icon>
        </td>
    </tr>
  `
    )
    .map((item) => `<tbody>${item}</tbody>`);

  html.unshift(
    `
    <thead>
      <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total</th>
      </tr>
    </thead>
    `
  );

  var total = 0;
  data.forEach((item) => {
    total =
      (item.onSale ? item.discountedPrice : item.price) * item.quantity + total;
  });
  html.push(`
    <tfoot>
      <tr>
        <td colspan="3">Total:</td>
        <td class="yourcart-total-value">${total.toLocaleString()}</td>
      </tr>
    </tfoot>
    
    `);

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
