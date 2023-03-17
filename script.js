///////////////////////////////////////////////////////////
const h1 = document.querySelector(".heading-primary");
const myName = "Vimal Prakash";
const yearEl = document.querySelector(".year");
const currYear = new Date().getFullYear();
const btnEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

// h1.addEventListener("click", function () {
//   h1.textContent = myName;
//   h1.style.backgroundColor = "red";
//   h1.style.padding = "5rem";
// });

//set current year
yearEl.textContent = currYear;

//mobile navigation

btnEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

//Smooth scrolling

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const hrefEl = link.getAttribute("href");

    //scroll back to top
    if (hrefEl === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    if (hrefEl !== "#" && hrefEl.startsWith("#")) {
      const secEl = document.querySelectorAll(hrefEl);
      secEl.scrollIntoView({ behavior: "smooth" });
    }

    //close navigation
    if (link.classList.contains("main-nav-link")) {
      headerEl.classList.toggle("nav-open");
    }
  });
});

/////////////// STICKY NAVIGATION /////////
const sectionHeroEl = document.querySelector(".section-hero");
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);
    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    //In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);
