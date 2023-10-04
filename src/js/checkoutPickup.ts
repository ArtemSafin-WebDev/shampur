import Hammer from "hammerjs";
export default function checkoutPickup() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".js-checkout-pickup")
  );

  elements.forEach((element) => {
    const openBtns = Array.from(
      element.querySelectorAll<HTMLButtonElement>(".js-pickup-modal-open")
    );
    const pickupModal = element.querySelector<HTMLElement>(".js-pickup-modal");
    const closeBtns = Array.from(
      element.querySelectorAll<HTMLButtonElement>(".js-pickup-modal-close")
    );

    const openModal = () => {
      pickupModal?.classList.add("active");
      document.body.classList.add("modal-open");
    };
    const closeModal = () => {
      pickupModal?.classList.remove("active");
      document.body.classList.remove("modal-open");
    };

    if (pickupModal) {
      openBtns.forEach((btn) =>
        btn.addEventListener("click", (event) => {
          event.preventDefault();
          openModal();
        })
      );

      closeBtns.forEach((btn) =>
        btn.addEventListener("click", (event) => {
          event.preventDefault();
          closeModal();
        })
      );
    }

    const openPaymentBtn = element.querySelector<HTMLButtonElement>(
      ".js-open-payment-btn"
    );

    const paymentBtnText = element.querySelector<HTMLElement>(
      ".checkout__payment-method-btn-text"
    );

    const paymentRadios = Array.from(
      element.querySelectorAll<HTMLInputElement>(
        ".checkout__payment-method-radio-input"
      )
    );

    const paymentModal = element.querySelector<HTMLElement>(
      ".checkout__payment-method-wrapper"
    );

    const closePaymentBtns = Array.from(
      element.querySelectorAll<HTMLButtonElement>(".js-close-payment-btn")
    );

    const setPaymentText = () => {
      const activeRadio = paymentRadios.find((radio) => radio.checked);
      if (!activeRadio) return;
      const text = activeRadio.parentElement?.querySelector(
        ".checkout__payment-method-radio-text"
      )?.textContent;

      if (text && paymentBtnText) {
        paymentBtnText.textContent = text;
      }
    };

    setPaymentText();

    paymentRadios.forEach((radio) =>
      radio.addEventListener("change", () => {
        setPaymentText();
      })
    );

    const openPaymentModal = () => {
      paymentModal?.classList.add("active");
      document.body.classList.add("modal-open");
    };
    const closePaymentModal = () => {
      paymentModal?.classList.remove("active");
      document.body.classList.remove("modal-open");
    };

    openPaymentBtn?.addEventListener("click", (event) => {
      event.preventDefault();
      openPaymentModal();
    });

    closePaymentBtns.forEach((btn) =>
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        closePaymentModal();
      })
    );

    if (paymentModal) {
      const mc = new Hammer(paymentModal);

      mc.get("swipe").set({ direction: Hammer.DIRECTION_VERTICAL });

      mc.on("swipedown", () => {
        if (!window.matchMedia("(max-width: 640px)").matches) return;
        closePaymentModal();
      });
    }

    paymentModal?.addEventListener("click", function (event) {
      if (event.target === this) {
        closePaymentModal();
      }
    });
  });
}
