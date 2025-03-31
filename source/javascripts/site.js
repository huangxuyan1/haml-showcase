document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".code-link").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      const match = el.dataset.match;
      document.querySelectorAll(`.code-link[data-match='${match}']`).forEach((m) => {
        m.classList.add("code-highlight");
      });
    });

    el.addEventListener("mouseleave", () => {
      const match = el.dataset.match;
      document.querySelectorAll(`.code-link[data-match='${match}']`).forEach((m) => {
        m.classList.remove("code-highlight");
      });
    });
  });
});
