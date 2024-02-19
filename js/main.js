async function renderMain(data) {
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

  var topProductListSelector = document.querySelector(".top-product-list");
  topProductListSelector.innerHTML = datamap.join("");
}

renderHeader("home")
  .then(renderFooter)
  .then(renderMain)
  .then(renderFilter((data) => renderMain(data)));
