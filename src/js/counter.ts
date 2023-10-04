export default function counter() {
  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (
      target.matches(".js-counter-minus") ||
      target.closest(".js-counter-minus")
    ) {
      const input = target
        .closest<HTMLElement>(".js-counter")
        ?.querySelector<HTMLInputElement>(".js-counter-value");
      if (!input) return;
      const currentValue = parseInt(input.value, 10);
      if (currentValue === 1) {
        const cartRemoveEvent = new CustomEvent("removeByCounter", {
          detail: {
            input: input,
          },
        });
        document.dispatchEvent(cartRemoveEvent);
      } else {
        input.value = (currentValue - 1).toString();
        const changeEvent = new Event("change");
        input.dispatchEvent(changeEvent);
      }
    }
    if (
      target.matches(".js-counter-plus") ||
      target.closest(".js-counter-plus")
    ) {
      console.log("Plus click");
      const input = target
        .closest<HTMLElement>(".js-counter")
        ?.querySelector<HTMLInputElement>(".js-counter-value");
      console.log("Input", input);
      if (!input) return;
      const currentValue = parseInt(input.value, 10);
      input.value = (currentValue + 1).toString();
      const changeEvent = new Event("change");
      input.dispatchEvent(changeEvent);
    }
  });
}
