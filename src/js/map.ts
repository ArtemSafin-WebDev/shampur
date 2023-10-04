export default function map() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".home-catalog__map")
  );

  elements.forEach((element) => {
    const btn = element.querySelector<HTMLElement>(
      ".home-catalog__search-heading"
    );
    btn?.addEventListener("click", (event) => {
      event.preventDefault();
      element.classList.toggle("dropdown-active");
    });
  });
}
