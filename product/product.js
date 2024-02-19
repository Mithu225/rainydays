function onAddToCart(id) {
  var carts = getValueFromStore(STORAGE_CARTS) || [];
  var products = getValueFromStore(STORAGE_PRODUCTS) || [];
  var selectedProductQuantity = parseInt(
    getValueFromStore(STORAGE_SELECTED_PRODUCT_QUANTITY)
  );
  var currentproduct = products.find((item) => item.id === id);

  var exitproduct = carts.find((item) => item.id === id);
  if (exitproduct) {
    carts = carts.map((item) => {
      if (item.id === id) {
        item.quantity = item.quantity + selectedProductQuantity;
        return item;
      }

      return item;
    });
  } else {
    currentproduct.quantity = selectedProductQuantity;
    carts.push(currentproduct);
  }

  setValueToStore(STORAGE_CARTS, carts);

  showToast(`Added ${currentproduct.title} to your cart`);
  updateCartNumber();
}

function generateProductDetailHTML(product, sizesHTML) {
  return ` 
      <div class="product-detail-left">
        <div class="box-product-detail-left">
          <a href="product-detail.html"
            ><img
              src="${product.image.url}"
              alt="${product.image.alt}"
              class="top-collection-1"
          /></a>
        </div>
      </div>
      <div class="product-detail-right">
        <h2 class="product-text-detail">${product.title}</h2>
        <p class="product-price">
            <span class='${product.onSale ? "product-price-old" : ""}'>
                ${product.price}
            </span>
            ${
              product.onSale
                ? "<span>" + product.discountedPrice + "</span>"
                : ""
            }
        </p>
        
        <div class="text-right-detail">
          <div class="box-selection-size">
            <div class="size-list">
              ${sizesHTML}
            </div>
          </div>
        </div>
        
            
        
        <div class="quantity-product">
          <label for="quantity">Quantity</label>

          <div class="quantity-control" data-quantity="">
            <button class="quantity-btn" data-quantity-minus=""  onclick="onDecrease()">
              <ion-icon size="large" name="remove"></ion-icon>
            </button>
            <input
              id="quantity-input"
              type="number"
              class="quantity-input"
              value="1"
              step="1"
              min="1"
              max=""
              name="quantity"
              onchange="onChangeQuantityInput()"
            />
            <button class="quantity-btn" data-quantity-plus="" onclick="onIncrease()">
              <ion-icon size="large" name="add"></ion-icon>
            </button>
          </div>
        </div>
        <div class="button-cart">
          <button class="button button-dark"  onclick="onAddToCart('${
            product.id
          }')">ADD TO CART</button>
          <button class="button button-primary"  onclick="navigate('/checkout')">YOUR CART</button>
        </div>
        <div class="product-description">
          <p>Description</p>
          <p class="text-description">
           ${product.description}
          </p>
        </div>
     
    </div>`;
}

function onChangeQuantityInput() {
  var quantitySelector = document.querySelector("#quantity-input");

  setValueToStore(
    STORAGE_SELECTED_PRODUCT_QUANTITY,
    parseInt(quantitySelector.value)
  );
}

async function renderProductDetail() {
  var productID = getValueFromStore(STORAGE_PRODUCTID);

  if (!productID) {
    window.location.href = BASE_URL + "/error";
    return;
  }

  var API_ENDPOIN_DETAIL = `${API_ENDPOINT}/${productID}`;
  var result = await getAPI(API_ENDPOIN_DETAIL);
  var product = result.data;

  var sizesGenerateHTML = generateProductSizesHTML(product.sizes);

  var datamap = generateProductDetailHTML(product, sizesGenerateHTML);

  var productListSelector = document.querySelector(".product-detail");
  productListSelector.innerHTML = datamap;

  function generateProductTitleHTML(category, title) {
    return `<h3 class="product-detail-link">PRODUCT / ${category} / ${title}</h3>`;
  }
  var datatitle = generateProductTitleHTML(product.tags[1], product.title);
  var productTitleSelector = document.querySelector(".breadcrumb");
  productTitleSelector.innerHTML = datatitle;
}

function calculateQuantity(isIncrease) {
  var selectedProductQuantity =
    getValueFromStore(STORAGE_SELECTED_PRODUCT_QUANTITY) || 0;

  var quantity;

  if (isIncrease) {
    quantity = parseInt(selectedProductQuantity);
    quantity = quantity + 1;
    setValueToStore(STORAGE_SELECTED_PRODUCT_QUANTITY, quantity);
  } else {
    quantity = parseInt(selectedProductQuantity);
    quantity = quantity - 1;
    if (quantity > 0) {
      setValueToStore(STORAGE_SELECTED_PRODUCT_QUANTITY, quantity);
    }
  }

  var quantitySelector = document.querySelector("#quantity-input");
  quantitySelector.value = quantity > 0 ? quantity : 1;
}

function onDecrease() {
  calculateQuantity(false);
}

function onIncrease() {
  calculateQuantity(true);
}

(async function () {
  beforeUnload(() => {
    deleteValueFromStore(STORAGE_PRODUCTID);
    deleteValueFromStore(STORAGE_SELECTED_PRODUCT_QUANTITY);
  });
  await renderHeader("product");
  await renderFooter();
  await renderProductDetail();
})();
