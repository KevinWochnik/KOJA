const menu = document.querySelector(".hero-menu");
const logo = document.querySelector(".logo-link");

window.addEventListener("scroll", () => {

  if (window.scrollY > 80) {
    menu.classList.add("menu-scrolled");
    logo.classList.add("logo-scrolled");
  } else {
    menu.classList.remove("menu-scrolled");
    logo.classList.remove("logo-scrolled");
  }

});