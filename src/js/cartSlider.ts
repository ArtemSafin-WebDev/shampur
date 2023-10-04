import Swiper from "swiper";
import { SwiperOptions } from "swiper/types";
import { Navigation } from "swiper/modules";

import "swiper/css";

export default function cartSlider() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".cart__add")
  );

  elements.forEach((element) => {
    const container = element.querySelector<HTMLElement>(".swiper");
    if (!container) return;
    const options: SwiperOptions = {
      modules: [Navigation],
      slidesPerView: "auto",
      speed: 600,
      navigation: {
        prevEl: element.querySelector<HTMLButtonElement>(
          ".cart__add-arrow--prev"
        ),
        nextEl: element.querySelector<HTMLButtonElement>(
          ".cart__add-arrow--next"
        ),
      },
    };
    new Swiper(container, options);
  });
}
