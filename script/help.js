const helpSection = document.querySelector(".help__section");
const HELP_MOTION_SCALE = 1.3;

if (helpSection) {
  const helpTabs = Array.from(helpSection.querySelectorAll(".help__tab"));
  const helpItems = Array.from(helpSection.querySelectorAll(".help__item"));
  const helpQuestions = Array.from(helpSection.querySelectorAll(".help__question"));

  if (helpTabs.length > 0 && helpItems.length > 0) {
    const closeQuestion = (question) => {
      const text = question.querySelector(".help__question-text");
      const icon = question.querySelector(".help__icon");

      question.classList.remove("is-open");

      if (text) {
        text.style.maxHeight = "0px";
      }

      if (icon) {
        icon.textContent = "+";
      }
    };

    const openQuestion = (question) => {
      const text = question.querySelector(".help__question-text");
      const icon = question.querySelector(".help__icon");

      question.classList.add("is-open");

      if (text) {
        text.style.maxHeight = `${text.scrollHeight}px`;
      }

      if (icon) {
        icon.textContent = "-";
      }
    };

    const resetAllQuestions = () => {
      helpQuestions.forEach((question) => closeQuestion(question));
    };

    const playTabPanelTransition = (panel) => {
      panel.classList.remove("help__item--active");
      panel.classList.remove("help__item--enter");
      void panel.offsetWidth;
      panel.classList.add("help__item--active");
      panel.classList.add("help__item--enter");

      window.setTimeout(() => {
        panel.classList.remove("help__item--enter");
      }, Math.round(320 * HELP_MOTION_SCALE));
    };

    const showHelpSection = (activeIndex) => {
      helpTabs.forEach((tab, index) => {
        tab.classList.toggle("help__tab--active", index === activeIndex);
      });

      helpItems.forEach((item, index) => {
        if (index === activeIndex) {
          playTabPanelTransition(item);
          return;
        }

        item.classList.remove("help__item--active");
        item.classList.remove("help__item--enter");
      });

      resetAllQuestions();
    };

    helpTabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        showHelpSection(index);
      });
    });

    helpQuestions.forEach((question) => {
      closeQuestion(question);

      question.addEventListener("click", () => {
        if (question.classList.contains("is-open")) {
          closeQuestion(question);
          return;
        }

        openQuestion(question);
      });
    });

    window.addEventListener("resize", () => {
      helpQuestions.forEach((question) => {
        if (question.classList.contains("is-open")) {
          const text = question.querySelector(".help__question-text");
          if (text) {
            text.style.maxHeight = `${text.scrollHeight}px`;
          }
        }
      });
    });

    const initialIndex = helpTabs.findIndex((tab) => tab.classList.contains("help__tab--active"));
    showHelpSection(initialIndex >= 0 ? initialIndex : 0);
  }
}
