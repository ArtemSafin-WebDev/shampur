document.addEventListener("DOMContentLoaded", () => {
  ymaps.ready(async function () {
    const checkoutPickup = document.querySelector(".js-checkout-pickup");
    if (!checkoutPickup) return;

    const wrapper = checkoutPickup.querySelector(
      ".checkout__form-pickup-modal-map-wrapper"
    );

    const mapElement = checkoutPickup.querySelector(
      ".checkout__form-pickup-modal-map"
    );

    const radioInputs = Array.from(
      checkoutPickup.querySelectorAll(
        ".checkout__form-pickup-modal-radio-input"
      )
    );

    const mobileBtnText = checkoutPickup.querySelector(
      ".checkout__form-address-mobile-btn-title"
    );
    const mobileBtnSchedule = checkoutPickup.querySelector(
      ".checkout__form-address-mobile-btn-schedule"
    );

    const addressInput = checkoutPickup.querySelector(".js-address-input");

    const initalCoords = wrapper.getAttribute("data-center").split(",");
    const zoom = wrapper.getAttribute("data-zoom");

    const pin = {
      iconLayout: "default#image",
      iconImageHref: wrapper.hasAttribute("data-pin-url")
        ? wrapper.getAttribute("data-pin-url")
        : "/images/pin.svg",
      iconImageSize: [32, 32],
      iconImageOffset: [-16, -16],
    };

    const map = new ymaps.Map(mapElement, {
      center: initalCoords,
      zoom,
      controls: [],
    });

    map.behaviors.disable("scrollZoom");

    const zoomControl = new ymaps.control.ZoomControl({
      options: {
        size: "small",
        position: {
          right: 10,
          bottom: 48,
        },
      },
    });

    map.controls.add(zoomControl);

    const objectManager = new ymaps.ObjectManager({
      geoObjectOpenBalloonOnClick: false,
      clusterize: false,
    });
    map.geoObjects.add(objectManager);

    const setActiveInput = () => {
      const checkedInput = radioInputs.find((input) => input.checked);
      if (!checkedInput) return;

      const text = checkedInput?.parentElement?.querySelector(
        ".checkout__form-pickup-modal-radio-text"
      )?.textContent;
      const schedule = checkedInput?.parentElement?.querySelector(
        ".checkout__form-pickup-modal-radio-schedule"
      )?.textContent;

      addressInput.value = text.trim();

      if (text) {
        mobileBtnText.textContent = text.trim();
      }
      if (schedule) {
        mobileBtnSchedule.textContent = schedule.trim();
      }

      const inputEvent = new Event("input");
      addressInput.dispatchEvent(inputEvent);
    };

    setActiveInput();

    radioInputs.forEach((input) => {
      const coords = input.getAttribute("data-coords").split(",");

      console.log("Coords", coords);

      const objectToAdd = {
        id: coords.join("-"),
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: coords,
        },
        options: {
          ...pin,
          balloonShadow: false,
          hideIconOnBalloonOpen: false,
        },
      };

      objectManager.add(objectToAdd);

      input.addEventListener("change", () => {
        setActiveInput();

        const checkedInput = radioInputs.find((input) => input.checked);
        if (!checkedInput) return;
        const checkedCoords = checkedInput
          .getAttribute("data-coords")
          .split(",");

        console.log("Checked coords", checkedCoords);
        map.setCenter(checkedCoords, 16);
      });
    });

    setTimeout(() => {
      const bounds = objectManager.getBounds();

      console.log("Bounds", bounds);
      map.setBounds(bounds, {
        checkZoomRange: true,
      });
    }, 500);
  });
});
