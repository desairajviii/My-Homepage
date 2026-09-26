const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  document.documentElement.classList.add("nav-enhanced");

  const closeMenu = () => {
    navToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navLinks.classList.toggle("is-open");
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      navToggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav")) {
      closeMenu();
    }
  });

  window.matchMedia("(min-width: 761px)").addEventListener("change", closeMenu);
}

const yearElement = document.querySelector("#current-year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const filterSummary = document.querySelector("#filter-summary");

filterButtons.forEach((button) => {
  button.setAttribute("aria-pressed", String(button.classList.contains("is-active")));
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("is-active");
    button.setAttribute("aria-pressed", "true");

    let visibleCount = 0;
    projectCards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      const shouldShow = selectedCategory === "all" || categories.includes(selectedCategory);
      card.hidden = !shouldShow;
      if (shouldShow) {
        visibleCount += 1;
      }
    });

    if (filterSummary) {
      const label = selectedCategory === "all" ? "all categories" : button.textContent.trim();
      filterSummary.textContent = `${visibleCount} project${visibleCount === 1 ? "" : "s"} shown for ${label}.`;
    }
  });
});

const spotlightButton = document.querySelector("#spotlight-button");
const spotlightTitle = document.querySelector("#spotlight-title");
const spotlightText = document.querySelector("#spotlight-text");
const spotlightCounter = document.querySelector("#spotlight-counter");

const spotlights = [
  {
    title: "Sea Water Purifier Monitoring",
    text: "Industrial IoT work taught me how protocol decoding, data validation, and interface design connect in one system.",
  },
  {
    title: "Jetson Nano Vision System",
    text: "This project helped me understand that edge AI depends on camera I/O, deployment constraints, and performance—not only the model.",
  },
  {
    title: "Student Management System",
    text: "Building the complete CRUD flow connected front-end state, API design, authentication, and database constraints for me.",
  },
  {
    title: "Pneumonia Detection",
    text: "Comparing several CNN approaches reinforced that evaluation quality matters more than adding complexity for its own sake.",
  },
];

if (spotlightButton && spotlightTitle && spotlightText) {
  let spotlightIndex = 0;
  spotlightButton.addEventListener("click", () => {
    spotlightIndex = (spotlightIndex + 1) % spotlights.length;
    spotlightTitle.textContent = spotlights[spotlightIndex].title;
    spotlightText.textContent = spotlights[spotlightIndex].text;
    if (spotlightCounter) {
      spotlightCounter.textContent = `${String(spotlightIndex + 1).padStart(2, "0")} / 04`;
    }
  });
}

// A small, deterministic prototype: match sample tasks to the visitor's energy.
const energyButtons = document.querySelectorAll(".energy-button");
const energyPanels = document.querySelectorAll("[data-task-energy]");
const energySummary = document.querySelector(".energy-summary");

energyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    energyButtons.forEach((item) => {
      const isSelected = item === button;
      item.classList.toggle("is-active", isSelected);
      item.setAttribute("aria-pressed", String(isSelected));
    });
    energyPanels.forEach((panel) => {
      const isRecommended = panel.dataset.taskEnergy === button.dataset.energy;
      panel.classList.toggle("is-recommended", isRecommended);
      if (isRecommended && energySummary) {
        const title = panel.querySelector("h3").textContent;
        energySummary.textContent = `${button.textContent.trim()}: start with ${title}.`;
      }
    });
  });
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          activeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
