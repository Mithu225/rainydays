async function renderProducts(data) {
  var products = data;

  if (!data) {
    var result = await getAPI(API_ENDPOINT);
    setValueToStore(STORAGE_PRODUCTS, result.data);

    var products = result.data;
    setFilterValues(products);
  }

  var topProductListSelector = document.querySelector(".product-list");

  if (products.length) {
    var datamap = products.map((item) => {
      var sizesGenerateHTML = generateProductSizesHTML(item.sizes);
      return generateProductItemHTML(item, sizesGenerateHTML);
    });

    topProductListSelector.innerHTML = datamap.join("");
  } else {
    topProductListSelector.innerHTML = `<div class="no-result">No result</div>`;
  }
}

(async function () {
  await renderHeader("products");
  await renderFooter();
  await renderProducts();
  await renderFilter(renderProducts);
})();
