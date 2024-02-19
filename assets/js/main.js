async function renderMain(data) {
  var products = data;

  if (!data) {
    var result = await getAPI(API_ENDPOINT);
    setValueToStore(STORAGE_PRODUCTS, result.data);

    var products = result.data;
    setFilterValues(products);
  }

  var topProductListSelector = document.querySelector(".top-product-list");

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

async function init() {
  await renderHeader("home");
  await renderFooter();
  await renderMain();
  await renderFilter((data) => renderMain(data));
}

init();
