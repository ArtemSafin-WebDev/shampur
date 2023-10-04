import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function stickyElements() {
  const navigationWrapper = document.querySelector<HTMLElement>(
    ".intro__navigation-wrapper"
  );
  const navigation = document.querySelector<HTMLElement>(".intro__navigation");

  let mm = gsap.matchMedia();

  if (navigationWrapper && navigation) {
    mm.add("(min-width: 641px)", () => {
      ScrollTrigger.create({
        trigger: navigationWrapper,
        start: "top top",
        end: 99999,
        pin: navigation,
        pinSpacing: false,
        onToggle: (self) => {
          if (self.isActive) {
            navigation?.classList.add("sticky");
          } else {
            navigation?.classList.remove("sticky");
          }
        },
      });
    });
  }

  const pageHeader = document.querySelector<HTMLElement>(".page-header");

  mm.add("(max-width: 640px)", () => {
    ScrollTrigger.create({
      trigger: pageHeader,
      start: "top top",
      end: 99999,
      pin: true,
      pinSpacing: false,
    });

    ScrollTrigger.create({
      trigger: navigationWrapper,
      start: () => `top top+=${pageHeader?.offsetHeight}`,
      end: 999999,
      pin: navigation,
      pinSpacing: false,
      onToggle: (self) => {
        if (self.isActive) {
          navigation?.classList.add("sticky");
        } else {
          navigation?.classList.remove("sticky");
        }
      },
    });
  });

  const checkoutSummary =
    document.querySelector<HTMLElement>(".checkout__summary");

  const rightCol = document.querySelector<HTMLElement>(".checkout__right-col");

  if (rightCol && checkoutSummary) {
    mm.add("(min-width: 641px)", () => {
      ScrollTrigger.create({
        trigger: rightCol,
        start: "top top+=20",
        end: () =>
          `top+=${
            rightCol.offsetHeight - checkoutSummary.offsetHeight
          } top+=20`,
        pin: checkoutSummary,
        pinSpacing: false,
      });
    });
  }
}
