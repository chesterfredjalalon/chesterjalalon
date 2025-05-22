document.addEventListener("DOMContentLoaded", () => {
  const headerHeight = document.querySelector(".navbar").offsetHeight;
  const links = [...document.querySelectorAll(".nav-link, .dropdown-item")];
  const sections = [...document.querySelectorAll("section")];
  const dropdownToggle = document.querySelector('#navbarDropdown');

  const setActive = (id) => {
    links.forEach(link => {
      const linkHref = link.getAttribute("href").substring(1);
      const isActive = linkHref === id || 
                       (["about", "education", "work"].includes(id) && linkHref === "navbarDropdown");
      link.classList.toggle("active", isActive);
    });
  };

  links.forEach(link => link.addEventListener("click", () => {
    const id = link.getAttribute("href").substring(1);
    setActive(id);
  }));

  window.addEventListener("scroll", () => {
    const fromTop = window.scrollY + headerHeight + 1;

    // Determine the currently active section
    const currentSection = sections.find(section => {
      const top = section.offsetTop - headerHeight;
      return fromTop >= top && fromTop < top + section.offsetHeight;
    })?.getAttribute("id") || (window.scrollY === 0 && "home");

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