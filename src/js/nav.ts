import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function nav() {
  let mm = gsap.matchMedia();
  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>(".intro__navigation-link")
  );

  const list = document.querySelector<HTMLUListElement>(
    ".intro__navigation-list"
  );

  const wrapper = document.querySelector<HTMLElement>(
    ".intro__navigation-wrapper"
  );

  const pageHeader = document.querySelector<HTMLElement>(".page-header");

  if (!list || !wrapper) return;

  links.forEach((link) => {
    const url = new URL(link.href);
    const hash = url.hash;
    console.log("Hash", hash);
    const correspondingElement = document.querySelector<HTMLElement>(hash);
    console.log("Corresponding element", correspondingElement);

    if (!correspondingElement) return;

    mm.add("(min-width: 641px)", () => {
      ScrollTrigger.create({
        trigger: correspondingElement,
        start: () => `top top+=${wrapper.offsetHeight + 22}`,
        end: () => `+=${correspondingElement.offsetHeight}`,
        onToggle: (self) => {
          if (self.isActive) {
            links.forEach((link) => link.classList.remove("active"));
            link.classList.add("active");

            const listItem = link.parentElement;

            if (listItem) {
              gsap.to(list, {
                duration: 0.4,
                ease: "power2.out",
                scrollTo: {
                  x: listItem,
                  autoKill: true,
                  offsetX: parseFloat(
                    window
                      .getComputedStyle(list, null)
                      .getPropertyValue("padding-left")
                  ),
                },
              });
            }
          } else {
            link.classList.remove("active");
          }
        },
      });
    });
    mm.add("(max-width: 640px)", () => {
      ScrollTrigger.create({
        trigger: correspondingElement,
        start: () =>
          `top top+=${
            wrapper.offsetHeight +
            (pageHeader ? pageHeader.offsetHeight : 0) +
            22
          }`,
        end: () => `+=${correspondingElement.offsetHeight}`,
        onToggle: (self) => {
          if (self.isActive) {
            links.forEach((link) => link.classList.remove("active"));
            link.classList.add("active");

            const listItem = link.parentElement;

            if (listItem) {
              gsap.to(list, {
                duration: 0.4,
                ease: "power2.out",
                scrollTo: {
                  x: listItem,
                  autoKill: true,
                  offsetX: parseFloat(
                    window
                      .getComputedStyle(list, null)
                      .getPropertyValue("padding-left")
                  ),
                },
              });
            }
          } else {
            link.classList.remove("active");
          }
        },
      });
    });
  });
}
