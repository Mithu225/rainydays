let reRenderComponent;

function setFilterValues(products) {
  var genders = products.map((item) => item.gender);
  var gendersUniqued = getValuesUniqued(genders);
  setValueToStore(FILTER_GENDERS, gendersUniqued);

  var tags = products.map((item) => item.tags.join("-"));
  var tagsUniqued = getValuesUniqued(tags);
  setValueToStore(FILTER_CATEGORIES, tagsUniqued);
}

function applyFilter() {
  var products = getValueFromStore(STORAGE_PRODUCTS);
  var genderSelect = document.getElementById("gender");
  var categorySelect = document.getElementById("category");

  var selectedGender = genderSelect.value;
  var selectedCategory = categorySelect.value;

  var productFiltered = products.filter((item) => {
    var conditions = [];

    if (selectedGender) {
      conditions.push(item.gender === selectedGender);
    }

    if (selectedCategory) {
      conditions.push(item.tags.join("-") === selectedCategory);
    }

    if (conditions.length > 0) {
      return conditions.every((value) => value === true);
    } else {
      return item;
    }
  });

  if (reRenderComponent) {
    reRenderComponent(productFiltered);
  }
}

async function renderFilter(callback) {
  reRenderComponent = callback;
  var genders = getValueFromStore(FILTER_GENDERS);
  var categories = getValueFromStore(FILTER_CATEGORIES);

  function genOptionHTML(values) {
    return values
      .map((item) => `<option value="${item}">${item}</option>`)
      .join("");
  }

  var filterHTML = `
		<form id="filter-form">
			<div class="form-group">
				<label for="gender">Gender:</label>
				<select id="gender" name="gender">
					<option value="">All</option>
					${genOptionHTML(genders)}
				</select
				</div>
				<div class="form-group">
				<label for="category">Category:</label>
				<select id="category" name="category">
					<option value="">All</option>
					${genOptionHTML(categories)}
				</select>
			</div>
			<button type="button" class="button button-primary" onclick="applyFilter()">Apply Filters</button>
		</form>
  `;

  var filterSelector = document.querySelector(".product-filter");
  filterSelector.innerHTML = filterHTML;

  return Promise.resolve(callback);
}
