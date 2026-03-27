const buttons = Array.from(document.querySelectorAll(".proces__button"));
const containers = Array.from(
  document.querySelectorAll(".proces__flow-container--a, .proces__flow-container--b, .proces__flow-container--c")
);
const PROCESS_MOTION_SCALE = 1.3;

const getTargetContainer = (button) => {
  if (button.classList.contains("proces__button--a")) {
    return document.querySelector(".proces__flow-container--a");
  }

  if (button.classList.contains("proces__button--b")) {
    return document.querySelector(".proces__flow-container--b");
  }

  if (button.classList.contains("proces__button--c")) {
    return document.querySelector(".proces__flow-container--c");
  }

  return null;
};

const replayFlowReveal = (container) => {
  const rows = Array.from(container.querySelectorAll(".proces__flow, .proces__flow--c"));

  rows.forEach((row, index) => {
    row.classList.remove("active");
    row.style.setProperty("--reveal-delay", `${(index * 0.07 * PROCESS_MOTION_SCALE).toFixed(3)}s`);

    // Force reflow so removing/adding .active restarts transition on every tab change.
    void row.offsetWidth;
  });

  requestAnimationFrame(() => {
    rows.forEach((row) => row.classList.add("active"));
  });
};

const isElementVisibleInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("active-button"));
    button.classList.add("active-button");

    containers.forEach((container) => container.classList.remove("visible"));

    const targetContainer = getTargetContainer(button);
    if (!targetContainer) {
      return;
    }

    targetContainer.classList.add("visible");
    replayFlowReveal(targetContainer);
  });
});

const initialVisibleContainer = document.querySelector(".proces__flow-container--a.visible, .proces__flow-container--b.visible, .proces__flow-container--c.visible");
if (initialVisibleContainer && isElementVisibleInViewport(initialVisibleContainer)) {
  replayFlowReveal(initialVisibleContainer);
}
