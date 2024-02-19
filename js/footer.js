async function renderFooter() {
  var footerSelector = document.querySelector("footer");
  footerSelector.innerHTML = `
		<div class="footer-bar">
        <div class="footer-left">
          <img
            class="footer-logo"
            src="/assets/images/Logo.jpg"
            alt="Rainyday logo"
          />
          <div>
            <p class="footer-detail">
              Lorem ipsum dolor sit amet consectetur. Amet sed nulla nibh ac sit
              netus. Est aenean neque consectetur id sed tempus.
            </p>
          </div>
          <div class="footer-icon">
            <ion-icon size="large" name="logo-facebook"></ion-icon>
            <ion-icon size="large" name="logo-google"></ion-icon>
            <ion-icon size="large" name="logo-twitter"></ion-icon>
            <ion-icon size="large" name="logo-instagram"></ion-icon>
          </div>
        </div>

        <div class="footer-right">
          <div class="footer-right-subscribe">
            <div class="email-subscribe">
              <form action="/login" class="footer-subscribe">
                <input
                  aria-label="email"
                  type="email"
                  id="email"
                  class="form-input"
                  placeholder="Enter your email"
                />
              </form>
            </div>
            <a class="button button-error" href="/subscribed">SUBSCRIBE</a>
          </div>
          <div class="footer-link-store">
            <div class="footer-right-shop">
              <p class="footer-shop">SHOP</p>
              <div class="footer-shop-details">
                <a href="/products">
                  <p>Mens</p>
                </a>
                <a href="/product">
                  <p>Womens</p>
                </a>
              </div>
            </div>
            <div class="footer-right-help">
              <p class="footer-help">HELP</p>
              <div class="footer-help-details">
                <a href="#"><p>Shipping & Return</p></a>
                <a href="#"><p>Customer service</p></a>
                <a href="/about"><p>About us</p></a>
                <a href="/contact"><p>Contacts</p></a>
              </div>
            </div>
            <div class="footer-right-info">
              <p class="footer-info">STORE INFORMATION</p>
              <div class="footer-info-details">
                <div class="footer-location">
                  <ion-icon name="location"></ion-icon>
                  <p class="footer-location-text">Rainydays Store,Avenue 123</p>
                </div>
                <div class="footer-email">
                  <ion-icon name="mail"></ion-icon>
                  <p class="footer-email-text">Email us: Rainydays@demo.com</p>
                </div>
                <div class="footer-phone">
                  <ion-icon name="call"></ion-icon>
                  <p class="footer-phone-text">Call us:012356789</p>
                </div>
                <div class="footer-fax">
                  <ion-icon name="copy"></ion-icon>
                  <p class="footer-fax-text">Fax:123567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  `;

  return retry(1000, 10, (finish) => {
    var footerSelector = document.querySelector("footer > div");
    if (footerSelector) {
      finish();
    }
  });
}
