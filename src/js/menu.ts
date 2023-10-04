export default function menu() {
  const menu = document.querySelector<HTMLElement>(".mobile-menu");
  if (!menu) return;

  const openMenu = () => {
    menu.classList.add("active");
    document.body.classList.add("menu-open");
  };
  const closeMenu = () => {
    menu.classList.remove("active");
    document.body.classList.remove("menu-open");
  };

  const openBtns = Array.from(
    document.querySelectorAll<HTMLButtonElement>(".js-open-menu")
  );
  const closeBtns = Array.from(
    document.querySelectorAll<HTMLButtonElement>(".js-close-menu")
  );

  const links = Array.from(menu.querySelectorAll("nav a"));

  openBtns.forEach((btn) =>
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      openMenu();
    })
  );

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      closeMenu();
    });
  });

  links.forEach((link) =>
    link.addEventListener("click", () => {
      closeMenu();
    })
  );
}
