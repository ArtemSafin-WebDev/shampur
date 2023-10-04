import Hammer from "hammerjs";

export default function modals() {
  const openModal = (selector: string): void => {
    if (!selector) return;
    const modal = document.querySelector<HTMLElement>(`.js-modal${selector}`);
    if (!modal) return;
    modal.classList.add("active");
    document.body.classList.add("modal-open");
  };

  const closeModal = (selector: string): void => {
    if (!selector) return;
    const modal = document.querySelector<HTMLElement>(`.js-modal${selector}`);
    if (!modal) return;
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
  };

  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.matches(".js-open-modal") || target.closest(".js-open-modal")) {
      event.preventDefault();
      console.log("Open modal clicked");
      const link = target.matches(".js-open-modal")
        ? target
        : target.closest(".js-open-modal");
      if (!link) return;
      const anchor = link as HTMLAnchorElement;
      const hash = anchor.hash;

      openModal(hash);
    }

    if (
      target.matches(".js-close-modal") ||
      target.closest(".js-close-modal")
    ) {
      event.preventDefault();
      const button = target.matches(".js-close-modal")
        ? (target as HTMLButtonElement)
        : target.closest<HTMLButtonElement>(".js-close-modal");
      if (!button) return;
      const modal = button.closest<HTMLElement>(".js-modal");
      if (!modal) return;
      modal.classList.remove("active");
      document.body.classList.remove("modal-open");
    }

    if (target.matches(".js-modal")) {
      const modal = target as HTMLDivElement;
      modal.classList.remove("active");
      document.body.classList.remove("modal-open");
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const activeModal =
        document.querySelector<HTMLDivElement>(".js-modal.active");
      if (!activeModal) return;
      activeModal?.classList.remove("active");
      document.body.classList.remove("modal-open");
    }
  });

  document.addEventListener("closemodal", (event) => {
    const closeModalEvent = event as CustomEvent<{
      selector: string;
    }>;
    closeModal(closeModalEvent.detail.selector);
  });
  document.addEventListener("openmodal", (event) => {
    const closeModalEvent = event as CustomEvent<{
      selector: string;
    }>;
    openModal(closeModalEvent.detail.selector);
  });

  const closeBtns = Array.from(
    document.querySelectorAll<HTMLButtonElement>(".js-close-modal")
  );

  closeBtns.forEach((btn) => {
    const mc = new Hammer(btn);

    console.log("MC for btn", mc, btn);

    mc.get("swipe").set({ direction: Hammer.DIRECTION_VERTICAL });

    mc.on("swipedown", () => {
      if (!window.matchMedia("(max-width: 640px)").matches) return;
      const activeModal = btn.closest(".js-modal");
      if (!activeModal) return;
      activeModal?.classList.remove("active");
      document.body.classList.remove("modal-open");
    });
  });
}
