// Flag that JS is running (CSS only hides .reveal items when this is set)
document.documentElement.classList.add("js");

// Mobile navigation toggle
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");

function setNav(open) {
  nav.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
}
toggle.addEventListener("click", () => setNav(!nav.classList.contains("open")));
nav.addEventListener("click", (e) => { if (e.target.closest("a")) setNav(false); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("open")) { setNav(false); toggle.focus(); }
});

// Gentle reveal on scroll (skipped when reduced motion is requested)
const items = document.querySelectorAll(".reveal");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduce || !("IntersectionObserver" in window)) {
  items.forEach((el) => el.classList.add("in"));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  items.forEach((el) => io.observe(el));
}

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();