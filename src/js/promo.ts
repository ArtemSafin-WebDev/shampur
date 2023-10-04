import Swiper from "swiper";
import { SwiperOptions, Swiper as SwiperInstance } from "swiper/types";

import "swiper/css";

export default function promo() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".home-catalog__promo")
  );

  elements.forEach((element) => {
    const container = element.querySelector<HTMLElement>(".swiper");
    if (!container) return;
    let instance: SwiperInstance | null = null;
    const mql = window.matchMedia("(max-width: 640px)");
    const options: SwiperOptions = {
      slidesPerView: "auto",
      speed: 600,
    };

    const handleWidthChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        instance = new Swiper(container, options);
      } else {
        if (instance) {
          instance.destroy();
          instance = null;
        }
      }
    };

    mql.addEventListener("change", handleWidthChange);

    handleWidthChange(mql);
  });
}
