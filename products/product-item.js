function generateProductSizesHTML(sizes) {
  return sizes
    .map(
      (size) =>
        `<div class="size-item size-${size.toLowerCase()}">${size}</div>`
    )
    .join("");
}

function generateProductItemHTML(product, sizeHTML) {
  return `<div class="home-product1" onclick="onSelectProduct('${product.id}')">
        <div class="box">
          <div class="new-product-label">
            <p class="new-text-label">${product.onSale ? "SALE" : "NEW"}</p>
            <img src="${BASE_URL}/assets/images/New.jpg" alt="New label">
          </div>
          <img src="${product.image.url}" alt="${
    product.image.alt
  }" class="top-collection-1">

          <div class="collection-star-icon">
            <ion-icon size="large" name="star" role="img" class="md icon-large hydrated"></ion-icon>
            <ion-icon size="large" name="star" role="img" class="md icon-large hydrated"></ion-icon>
            <ion-icon size="large" name="star" role="img" class="md icon-large hydrated"></ion-icon>
            <ion-icon size="large" name="star" role="img" class="md icon-large hydrated"></ion-icon>
            <ion-icon size="large" name="star-half" role="img" class="md icon-large hydrated"></ion-icon>
          </div>
          <p class="product-name">${product.title}</p>
          <p class="product-price">
						<span class='${product.onSale ? "product-price-old" : ""}'>
							${product.price}
						</span>
						${product.onSale ? "<span>" + product.discountedPrice + "</span>" : ""}
					</p>
          <div class="collection-procduct-color">
						<div class="size-list">
							${sizeHTML}
						</div>
          </div>
        </div>
      </div>`;
}

function onSelectProduct(id) {
  setValueToStore(STORAGE_PRODUCTID, id);
  window.location.href = "/product";
}
