const menu = document.querySelector(".hero-menu");
const logo = document.querySelector(".logo-link");
const burger = document.querySelector(".burger");

if (menu && logo) {
  const setMenuState = (isOpen) => {
    menu.classList.toggle("menu-open", isOpen);
    logo.classList.toggle("menu-open", isOpen);
    document.body.classList.toggle("no-scroll", isOpen);

    if (burger) {
      burger.classList.toggle("fa-bars", !isOpen);
      burger.classList.toggle("fa-xmark", isOpen);
      burger.setAttribute("aria-expanded", String(isOpen));
      burger.setAttribute("aria-label", isOpen ? "Zamknij menu" : "Otworz menu");
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

  menu.querySelectorAll(".navigation-link").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1200) {
      setMenuState(false);
    }
  });

  setMenuState(false);
  updateNavigationState();
  window.addEventListener("scroll", updateNavigationState);
}

