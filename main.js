document.addEventListener("DOMContentLoaded", () => {
  const headerHeight = document.querySelector(".navbar").offsetHeight;
  const links = [...document.querySelectorAll(".nav-link, .dropdown-item")];
  const sections = [...document.querySelectorAll("section")];
  const dropdownToggle = document.querySelector("#navbarDropdown");

  const setActive = (id) => {
    links.forEach((link) => {
      const linkHref = link.getAttribute("href").substring(1);
      const isActive =
        linkHref === id ||
        (["about", "education", "work"].includes(id) &&
          linkHref === "navbarDropdown");
      link.classList.toggle("active", isActive);
    });
  };

  links.forEach((link) =>
    link.addEventListener("click", () => {
      const id = link.getAttribute("href").substring(1);
      setActive(id);
    })
  );

  window.addEventListener("scroll", () => {
    const fromTop = window.scrollY + headerHeight + 1;

    // Determine the currently active section
    const currentSection =
      sections
        .find((section) => {
          const top = section.offsetTop - headerHeight;
          return fromTop >= top && fromTop < top + section.offsetHeight;
        })
        ?.getAttribute("id") ||
      (window.scrollY === 0 && "home");

    // Set the active state based on the current section
    setActive(currentSection);

    // Special handling for the 'About' dropdown
    if (["about", "education", "work"].includes(currentSection)) {
      dropdownToggle.classList.add("active");
    } else {
      dropdownToggle.classList.remove("active");
    }
  });
});

const copy = document.querySelector(".logos-slide").cloneNode(true);
document.querySelector(".logos").appendChild(copy);

document.addEventListener("DOMContentLoaded", function () {
  const projectsContainer = document.getElementById("projects-container");
  const showMoreBtn = document.getElementById("show-more-btn");
  const showMoreContainer = document.getElementById("show-more-container");
  const moreProjects = document.querySelectorAll(".more-projects");

  // Only show button if there are hidden projects
  if (moreProjects.length > 0) {
    showMoreContainer.style.display = "block";
  }

  showMoreBtn.addEventListener("click", function () {
    // Toggle all hidden projects
    moreProjects.forEach((project) => {
      if (project.style.display === "none") {
        project.style.display = "block";
        showMoreBtn.textContent = "Show Less";
      } else {
        project.style.display = "none";
        showMoreBtn.textContent = "Show More Projects";
      }
    });

    // Scroll to maintain position (optional)
    projectsContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
});

// JavaScript for hide on scroll down, show on scroll up
let lastScroll = 0;
const navbar = document.querySelector("nav");
const navbarHeight = navbar.offsetHeight;

// Add some space at the top of the page equal to navbar height
document.body.style.paddingTop = `${navbarHeight}px`;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    // At top of page - always show navbar
    navbar.classList.remove("hidden");
    return;
  }

  if (currentScroll > lastScroll) {
    // Scrolling down - hide navbar
    navbar.classList.add("hidden");
  } else {
    // Scrolling up - show navbar
    navbar.classList.remove("hidden");
  }

  lastScroll = currentScroll;
});

document
  .querySelectorAll(
    ".project-1, .project-2, .project-3, .project-4, .project-5, .project-6, .project-7, .project-8, .project-9, .project-10, .project-11, .project-12"
  )
  .forEach((card) => {
    const img = card.querySelector(".hover-gif");
    const staticSrc = img.getAttribute("data-static");
    const gifSrc = img.getAttribute("data-gif");

    // Apply transition style
    img.style.transition = "opacity 0.5s ease-in-out";

    card.addEventListener("mouseenter", () => {
      img.style.opacity = "0";
      setTimeout(() => {
        img.src = gifSrc;
        img.style.opacity = "1";
      }, 200); // Wait for fade-out before switching
    });

    card.addEventListener("mouseleave", () => {
      img.style.opacity = "0";
      setTimeout(() => {
        img.src = staticSrc;
        img.style.opacity = "1";
      }, 200);
    });
  });
