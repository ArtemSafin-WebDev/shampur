import gsap from "gsap";

export default function lazyloading() {
  const images = Array.from(
    document.querySelectorAll<HTMLImageElement>("img[loading='lazy']")
  );

  images.forEach((image) => {
    gsap.set(image, {
      autoAlpha: 0,
    });
    function loaded() {
      gsap.to(image, {
        autoAlpha: 1,
        duration: 0.4,
        clearProps: "all",
        ease: "power2.out",
      });
    }

    if (image.complete) {
      loaded();
    } else {
      image.addEventListener("load", loaded);
    }
  });
}
