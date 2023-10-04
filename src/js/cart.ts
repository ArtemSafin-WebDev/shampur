export default function cart() {
  const cart = document.querySelector<HTMLElement>(".cart");
  if (!cart) return;

  const openCart = () => {
    cart?.classList.add("active");
    document.body.classList.add("cart-open");
  };

  const closeCart = () => {
    cart?.classList.remove("active");
    document.body.classList.remove("cart-open");
  };

  const openBtns = Array.from(
    document.querySelectorAll<HTMLLinkElement | HTMLButtonElement>(
      ".js-open-cart"
    )
  );
  const closeBtns = Array.from(
    document.querySelectorAll<HTMLLinkElement | HTMLButtonElement>(
      ".js-close-cart"
    )
  );

  openBtns.forEach((btn) =>
    btn.addEventListener("click", (event) => {
      event.preventDefault();

      openCart();
    })
  );

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      closeCart();
    });
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCart();
    }
  });

  cart.addEventListener("click", function (event) {
    if (event.target === this) {
      closeCart();
    }
  });
}
