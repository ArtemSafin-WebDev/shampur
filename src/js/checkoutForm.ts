import Validator from "./classes/Validator";

export default function checkoutForm() {
  const forms = Array.from<HTMLFormElement>(
    document.querySelectorAll(".js-checkout-form")
  );

  forms.forEach((form) => {
    const formValidator = new Validator(form);

    const handleFormSubmit = (event: SubmitEvent) => {
      if (!formValidator || !form) return;
      formValidator.validate();
      if (formValidator.valid) {
        console.log("Sending form");
      } else {
        event.preventDefault();
      }
    };
    form.addEventListener("submit", handleFormSubmit);
  });
}
