document.addEventListener("DOMContentLoaded", () => {
  ymaps.ready(async function () {
    const checkoutDelivery = document.querySelector(".js-checkout-delivery");
    if (!checkoutDelivery) return;

    const wrapper = checkoutDelivery.querySelector(".checkout__form-map");

    const mapElement = checkoutDelivery.querySelector(
      ".checkout__form-map-element"
    );

    const initalCoords = wrapper.getAttribute("data-center").split(",");
    const zoom = wrapper.getAttribute("data-zoom");

    const detectLocation = checkoutDelivery.querySelector(
      ".js-detect-location"
    );

    const addressInput = checkoutDelivery.querySelector(".js-address-input");

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
          bottom: 40,
        },
      },
    });

    map.controls.add(zoomControl);

    const objectManager = new ymaps.ObjectManager({
      geoObjectOpenBalloonOnClick: false,
      clusterize: false,
    });
    map.geoObjects.add(objectManager);

    const putPlacemark = (coords) => {
      objectManager.removeAll();
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
    };

    if ("geolocation" in navigator) {
      detectLocation.style.display = "";

      detectLocation.addEventListener(
        "click",
        (event) => {
          event.preventDefault();

          navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            console.log("Geolocation coords", [lat, lng]);

            const coords = [lat, lng];

            const myGeocoder = ymaps.geocode(coords, {
              results: 1,
            });

            myGeocoder
              .then((res) => {
                const address = res?.geoObjects?.get(0)?.getAddressLine();
                console.log("REsult", address);

                addressInput.value = address;

                const changeEvent = new Event("input");
                addressInput.dispatchEvent(changeEvent);

                putPlacemark(coords);
              })
              .catch((err) => console.error(err));
          });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      detectLocation.style.display = "none";
    }
  });
});
