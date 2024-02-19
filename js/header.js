function getSelectedClass(name, selected) {
  return selected === name ? "menu-bar-item--selected" : "";
}

async function renderHeader(selected) {
  var headerSelector = document.querySelector("header");
  headerSelector.innerHTML = `
		<div>
			<h1 class="season-header">Season Sale - Up to 70% Off</h1>
		</div>

		<section class="header-bar">
			<img src="/assets/images/Logo.jpg" />
			<ul class="menu-bar">
				<li>
					<a class="menu-bar-item ${getSelectedClass("home", selected)}" href="/">HOME</a>
				</li>
				<li>
					<a class="menu-bar-item ${getSelectedClass(
            "products",
            selected
          )}" href="/products">PRODUCTS</a
					>
				</li>
				<li><a class="menu-bar-item ${getSelectedClass(
          "about",
          selected
        )}" href="/about">ABOUT</a></li>
				<li>
					<a class="menu-bar-item ${getSelectedClass(
            "contact",
            selected
          )}" href="/contact">CONTACT</a>
				</li>
			</ul>
			<div class="menu-icon">
				<a href="/login" aria-label="login">
					<ion-icon size="large" name="person-circle-outline"></ion-icon>
				</a>
				<a href="/checkout" aria-label="your cart">
					<ion-icon size="large" name="cart"></ion-icon>
					<div id="your-cart-number"></div>
				</a>
			</div>
		</section>
  `;
  return waitForElement(".header-bar", headerSelector);
}
