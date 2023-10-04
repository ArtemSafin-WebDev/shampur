import Hammer from "hammerjs";

export default function checkoutDelivery() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".js-checkout-delivery")
  );

  elements.forEach((element) => {
    const addressBtn =
      element.querySelector<HTMLButtonElement>(".js-address-btn");

    const addressBtnText = addressBtn?.querySelector(
      ".checkout__form-address-btn-text"
    );

    const addressPlaceholderText = addressBtn?.hasAttribute("data-placeholder")
      ? addressBtn?.getAttribute("data-placeholder")
      : "";

    const addressInput =
      element.querySelector<HTMLInputElement>(".js-address-input");

    const addressWrapper = element.querySelector<HTMLElement>(
      ".checkout__form-address-wrapper"
    );

    const closeAddressModalBtns = Array.from(
      element.querySelectorAll(".js-address-modal-close")
    );

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
      document.querySelectorAll<HTMLButtonElement>(".js-close-payment-btn")
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

    const openAddressModal = () => {
      addressWrapper?.classList.add("active");
      document.body.classList.add("modal-open");
    };

    const closeAddressModal = () => {
      addressWrapper?.classList.remove("active");
      document.body.classList.remove("modal-open");
    };

    addressInput?.addEventListener("input", () => {
      if (addressInput.value.trim()) {
        if (addressBtnText) {
          addressBtnText.textContent = addressInput.value;
        }
      } else {
        if (addressBtnText) {
          addressBtnText.textContent = addressPlaceholderText;
        }
      }
    });

    addressBtn?.addEventListener("click", (event) => {
      event.preventDefault();
      openAddressModal();
    });

    closeAddressModalBtns.forEach((btn) =>
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        closeAddressModal();
      })
    );
  });
}
