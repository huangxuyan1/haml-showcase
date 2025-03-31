document.addEventListener("DOMContentLoaded", function () {
  const courseElements = document.querySelectorAll(".class-box");

  courseElements.forEach(course => {
    course.addEventListener("mouseenter", function () {
      const prereqs = this.dataset.pre?.split(" ") || [];
      const coreqs = this.dataset.co?.split(" ") || [];
      const postreqs = this.dataset.post?.split(" ") || [];

      // Highlight coreqs
      const cell = this.closest("td");
      const row = cell.parentElement;
      const colIndex = Array.from(row.children).indexOf(cell);
      const allRows = document.querySelectorAll("table.four-year-plan tbody tr");
      allRows.forEach(row => {
        const targetCell = row.children[colIndex];
        if (!targetCell) return;

        targetCell.querySelectorAll(".class-box").forEach(el => {
          const code = el.dataset.id;
          if (coreqs.includes(code)) {
            el.classList.add("highlight-coreq");
          }
        });
      });
      
      // Highlight prereqs
      prereqs.forEach(code => {
        const targets = document.querySelectorAll(`.class-box[data-id="${code}"]`);
        targets.forEach(target => {
          // Only highlight if not already a coreq in the same cell
          if (!target.classList.contains("highlight-coreq")) {
            target.classList.add("highlight-prereq");
          }
        });
      });

      // Highlight postreqs
      postreqs.forEach(code => {
        const targets = document.querySelectorAll(`.class-box[data-id="${code}"]`);
        targets.forEach(target => {
          target.classList.add("highlight-postreq");
        });
      });

      // Highlight self
      this.classList.add("highlight-self");
    });

    course.addEventListener("mouseleave", function () {
      document.querySelectorAll(".highlight-prereq, .highlight-coreq, .highlight-postreq, .highlight-self").forEach(el => {
        el.classList.remove("highlight-prereq", "highlight-coreq", "highlight-postreq", "highlight-self");
      });
    });
  });
});