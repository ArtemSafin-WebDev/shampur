document.addEventListener("DOMContentLoaded", () => {
  ymaps.ready(async function () {
    const MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
      '<div class="popover top">' +
        '<a class="close" href="#">&times;</a>' +
        '<div class="arrow"></div>' +
        '<div class="popover-inner">' +
        "$[[options.contentLayout observeSize minWidth=200 maxWidth=200 maxHeight=80]]" +
        "</div>" +
        "</div>",
      {
        /**
         * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
         * @function
         * @name build
         */
        build: function () {
          this.constructor.superclass.build.call(this);

          this._$element = $(".popover", this.getParentElement());

          this.applyElementOffset();

          this._$element
            .find(".close")
            .on("click", $.proxy(this.onCloseClick, this));
        },

        /**
         * Удаляет содержимое макета из DOM.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
         * @function
         * @name clear
         */
        clear: function () {
          this._$element.find(".close").off("click");

          this.constructor.superclass.clear.call(this);
        },

        /**
         * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
         * @function
         * @name onSublayoutSizeChange
         */
        onSublayoutSizeChange: function () {
          MyBalloonLayout.superclass.onSublayoutSizeChange.apply(
            this,
            arguments
          );

          if (!this._isElement(this._$element)) {
            return;
          }

          this.applyElementOffset();

          this.events.fire("shapechange");
        },

        /**
         * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
         * @function
         * @name applyElementOffset
         */
        applyElementOffset: function () {
          this._$element.css({
            left: -(this._$element[0].offsetWidth / 2),
            top: -(
              this._$element[0].offsetHeight +
              this._$element.find(".arrow")[0].offsetHeight
            ),
          });
        },

        /**
         * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
         * @function
         * @name onCloseClick
         */
        onCloseClick: function (e) {
          e.preventDefault();

          this.events.fire("userclose");
        },

        /**
         * Используется для автопозиционирования (balloonAutoPan).
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
         * @function
         * @name getClientBounds
         * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
         */
        getShape: function () {
          if (!this._isElement(this._$element)) {
            return MyBalloonLayout.superclass.getShape.call(this);
          }

          var position = this._$element.position();

          return new ymaps.shape.Rectangle(
            new ymaps.geometry.pixel.Rectangle([
              [position.left, position.top],
              [
                position.left + this._$element[0].offsetWidth,
                position.top +
                  this._$element[0].offsetHeight +
                  this._$element.find(".arrow")[0].offsetHeight,
              ],
            ])
          );
        },

        /**
         * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
         * @function
         * @private
         * @name _isElement
         * @param {jQuery} [element] Элемент.
         * @returns {Boolean} Флаг наличия.
         */
        _isElement: function (element) {
          return element && element[0] && element.find(".arrow")[0];
        },
      }
    );

    const MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
      '<h3 class="popover-title">$[header]</h3>' +
        '<div class="popover-content">$[content]</div>'
    );
    const wrapper = document.querySelector(".js-check-address-wrapper");
    const checkAddressElement = document.querySelector(
      ".js-check-address-element"
    );
    if (!checkAddressElement || !wrapper) return;

    const center = wrapper.getAttribute("data-center").split(",");
    const zoom = wrapper.getAttribute("data-zoom");
    const areaUrl = wrapper.getAttribute("data-geojson");
    const city = wrapper.getAttribute("data-city");
    const invertCoords = wrapper.hasAttribute("data-invert-coords")
      ? true
      : false;

    const map = new ymaps.Map(checkAddressElement, {
      center,
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
    if (window.matchMedia("(min-width: 641px)").matches) {
      map.controls.add(zoomControl);
    }

    const balloon = new ymaps.Balloon(map, {
      layout: MyBalloonLayout,
      contentLayout: MyBalloonContentLayout,
      panelMaxMapArea: 0,
    });

    balloon.options.setParent(map.options);

    let geoQuery = null;

    try {
      const res = await fetch(areaUrl);
      if (!res.ok) throw new Error("Response is not ok");
      const data = await res.json();

      console.log("Area data", data);

      if (invertCoords) {
        data.features.forEach((feature) => {
          const coords = feature.geometry.coordinates.map((item) => {
            const innerCoords = item.map((item) => {
              const [firstCoord, secondCoord] = item;
              return [secondCoord, firstCoord];
            });

            return innerCoords;
          });

          feature.geometry.coordinates = coords;

          feature.options = {
            fillColor: "#ff6939",
            fillOpacity: 0.3,
            strokeColor: "#ff6939",
            strokeWidth: 2,
            strokeOpacity: 0.8,
          };
        });
      }

      data.features.forEach((feature) => {
        feature.options = {
          fillColor: "#ff6939",
          fillOpacity: 0.3,
          strokeColor: "#ff6939",
          strokeWidth: 2,
          strokeOpacity: 0.8,
        };
      });

      geoQuery = ymaps.geoQuery(data).addToMap(map);
    } catch (err) {
      console.error(err);
      return;
    }

    const form = document.querySelector(".js-check-address-form");

    if (!form) return;

    const input = form.querySelector("input");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = input.value;

      if (!value.trim()) return;

      const searchQuery = input.value.toLowerCase().startsWith(city)
        ? input.value
        : `${city}, ${input.value}`;
      const myGeocoder = ymaps.geocode(searchQuery, {
        results: 1,
      });

      myGeocoder.then(function (res) {
        const containing = geoQuery
          .searchContaining(res.geoObjects.get(0))
          .get(0);

        console.log("Containing", containing);
        if (containing) {
          const coords = res.geoObjects.get(0).geometry.getCoordinates();
          // map.panTo(coords);

          balloon.open(coords, {
            header: "Отлично,<br> мы доставляем к вам!",
            content: `<a href="#menu" class="js-anchor">перейти к меню</a>`,
          });
        } else {
          const coords = res?.geoObjects?.get(0)?.geometry?.getCoordinates();
          if (coords) {
            // map.panTo(coords, 17);
            balloon.open(coords, {
              header: "По данному адресу нет доставки!",
              content: `<a href="#menu" class="js-anchor">перейти к меню</a>`,
            });
          } else {
            // map.panTo(center, zoom);
            balloon.open(coords, {
              header: "Адрес не найден!",
              content: `<a href="#menu" class="js-anchor">перейти к меню</a>`,
            });
          }
        }
      });
    });
  });
});
