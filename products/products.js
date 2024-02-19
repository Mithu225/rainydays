async function renderProducts(data) {
  var products = data;

  if (!data) {
    var result = await getAPI(API_ENDPOINT);
    setValueToStore(STORAGE_PRODUCTS, result.data);

    var products = result.data;
    setFilterValues(products);
  }

  var datamap = products.map((item) => {
    var sizesGenerateHTML = generateProductSizesHTML(item.sizes);
    return generateProductItemHTML(item, sizesGenerateHTML);
  });

  var topProductListSelector = document.querySelector(".product-list");
  topProductListSelector.innerHTML = datamap.join("");
}

(async function () {
  await renderHeader("products");
  await renderFooter();
  await renderFilter(renderProducts);
  await renderProducts();
})();
