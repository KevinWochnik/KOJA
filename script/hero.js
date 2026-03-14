const menu = document.querySelector(".hero-menu");
const logo = document.querySelector(".logo-link");
const burger = document.querySelector(".burger");
const desktopBreakpoint = 1024;

if (menu && logo) {
  const isDesktopViewport = () => window.innerWidth >= desktopBreakpoint;

  const setMenuState = (isOpen) => {
    const shouldOpen = !isDesktopViewport() && isOpen;

    menu.classList.toggle("menu-open", shouldOpen);
    logo.classList.toggle("menu-open", shouldOpen);
    document.body.classList.remove("no-scroll");

    if (burger) {
      burger.classList.toggle("fa-bars", !shouldOpen);
      burger.classList.toggle("fa-xmark", shouldOpen);
      burger.setAttribute("aria-expanded", String(shouldOpen));
      burger.setAttribute("aria-label", shouldOpen ? "Zamknij menu" : "Otworz menu");
    }
  };

  const updateNavigationState = () => {
    const isScrolled = window.scrollY > 80;

    menu.classList.toggle("menu-scrolled", isScrolled);
    logo.classList.toggle("logo-scrolled", isScrolled);
  };

  if (burger) {
    burger.setAttribute("role", "button");
    burger.setAttribute("tabindex", "0");
    burger.setAttribute("aria-controls", "mobile-navigation");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Otworz menu");

    burger.addEventListener("click", () => {
      const isOpen = menu.classList.contains("menu-open");
      setMenuState(!isOpen);
    });

    burger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const isOpen = menu.classList.contains("menu-open");
        setMenuState(!isOpen);
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("menu-open")) {
      setMenuState(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (isDesktopViewport() || !menu.classList.contains("menu-open")) {
      return;
    }

    const target = event.target;

    if (!(target instanceof Node)) {
      return;
    }

    if (menu.contains(target) || (burger && burger.contains(target))) {
      return;
    }

    setMenuState(false);
  });

  menu.querySelectorAll(".navigation-link").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= desktopBreakpoint) {
      setMenuState(false);
    }
  });

  setMenuState(false);
  updateNavigationState();
  window.addEventListener("scroll", updateNavigationState);
}
