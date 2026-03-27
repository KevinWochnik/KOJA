const revealElements = Array.from(document.querySelectorAll(".reveal"));
const revealGroups = Array.from(document.querySelectorAll("[data-reveal-group]"));
const MOTION_SCALE = 1.3;

const parseNumber = (value, fallback = 0) => {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const scaleDelay = (value) => Math.max(0, value * MOTION_SCALE);

const assignRevealDelays = () => {
  const groupedElements = new Set();

  revealGroups.forEach((group) => {
    const stagger = parseNumber(group.dataset.revealStagger, 0.08);
    const items = Array.from(group.querySelectorAll(".reveal"));

    items.forEach((item, index) => {
      const orderAttr = item.dataset.revealOrder;
      const order = orderAttr !== undefined ? parseNumber(orderAttr, index) : index;
      const baseDelay = parseNumber(item.dataset.revealDelay, 0);
      const totalDelay = scaleDelay(baseDelay + order * stagger);

      item.style.setProperty("--reveal-delay", `${totalDelay.toFixed(3)}s`);
      groupedElements.add(item);
    });
  });

  revealElements.forEach((item) => {
    if (groupedElements.has(item)) {
      return;
    }

    const standaloneDelay = parseNumber(item.dataset.revealDelay, 0);
    item.style.setProperty("--reveal-delay", `${scaleDelay(standaloneDelay).toFixed(3)}s`);
  });
};

const initRevealObserver = () => {
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((item) => item.classList.add("active"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("active");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.3,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  revealElements.forEach((item) => observer.observe(item));
};

assignRevealDelays();
initRevealObserver();
