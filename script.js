const revealElements = document.querySelectorAll('.reveal')

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    },
    {
        threshold: 0.2,
    }
);
revealElements.forEach((element) => {
    revealObserver.observe(element);
});
