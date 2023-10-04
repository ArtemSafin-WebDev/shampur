import "virtual:svg-icons-register";
import "../scss/style.scss";
import ticker from "./ticker";
import promo from "./promo";
import map from "./map";
import counter from "./counter";
import modals from "./modals";
import cartSlider from "./cartSlider";
import cart from "./cart";
import menu from "./menu";
import smoothScrolling from "./smoothScrolling";
import stickyElements from "./stickyElements";
import nav from "./nav";
import selects from "./selects";
import lazyloading from "./lazyloading";
import checkoutForm from "./checkoutForm";

document.addEventListener("DOMContentLoaded", () => {
  smoothScrolling();
  lazyloading();
  ticker();
  promo();
  map();
  selects();
  counter();
  modals();
  cartSlider();
  cart();
  menu();
  stickyElements();
  nav();
  checkoutForm();
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
