function getSelectedClass(name, selected) {
  return selected === name ? "menu-bar-item--selected" : "";
}

async function renderHeader(selected) {
  var headerSelector = document.querySelector("header");
  headerSelector.innerHTML = `
		<section class="header-bar">
			<img class="header-logo" src="${BASE_URL}/assets/images/Logo.jpg" />
			<ul class="menu-bar">
				<li>
					<a class="menu-bar-item ${getSelectedClass(
            "home",
            selected
          )}" href="${BASE_URL}/">HOME</a>
				</li>
				<li>
					<a class="menu-bar-item ${getSelectedClass(
            "products",
            selected
          )}" href="${BASE_URL}/products">PRODUCTS</a
					>
				</li>
				<li><a class="menu-bar-item ${getSelectedClass(
          "about",
          selected
        )}" href="${BASE_URL}/about">ABOUT</a></li>
				<li>
					<a class="menu-bar-item ${getSelectedClass(
            "contact",
            selected
          )}" href="${BASE_URL}/contact">CONTACT</a>
				</li>
			</ul>
			<div class="menu-icon">
				<a href="${BASE_URL}/login" aria-label="login">
					<ion-icon size="large" name="person-circle-outline"></ion-icon>
				</a>
				<a href="${BASE_URL}/checkout" aria-label="your cart">
					<ion-icon size="large" name="cart"></ion-icon>
					<div id="your-cart-number"></div>
				</a>
			</div>
		</section>
  `;
  return waitForElement(".header-bar", headerSelector);
}
