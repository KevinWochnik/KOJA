const buttons = document.querySelectorAll(".proces__button");
const containers = document.querySelectorAll(
  ".proces__flow-container--a, .proces__flow-container--b, .proces__flow-container--c"
);

buttons.forEach(button => {
  button.addEventListener("click", () => {

    // usuń aktywny przycisk
    buttons.forEach(btn => btn.classList.remove("active-button"));

    // ustaw aktywny
    button.classList.add("active-button");

    // ukryj wszystkie sekcje
    containers.forEach(container => container.classList.remove("visible"));

    // pokaż odpowiednią
    if (button.classList.contains("proces__button--a")) {
      document.querySelector(".proces__flow-container--a").classList.add("visible");
    }

    if (button.classList.contains("proces__button--b")) {
      document.querySelector(".proces__flow-container--b").classList.add("visible");
    }

    if (button.classList.contains("proces__button--c")) {
      document.querySelector(".proces__flow-container--c").classList.add("visible");
    }

  });
});