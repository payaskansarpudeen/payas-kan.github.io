const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const header = document.querySelector(".site-header");

const savedTheme = localStorage.getItem("payas-theme");
if (savedTheme === "dark") {
  body.classList.add("dark");
  themeToggle.textContent = "☀";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const dark = body.classList.contains("dark");
  localStorage.setItem("payas-theme", dark ? "dark" : "light");
  themeToggle.textContent = dark ? "☀" : "☾";
});

menuToggle.addEventListener("click", () => header.classList.toggle("nav-open"));
document.querySelectorAll("nav a").forEach(a => a.addEventListener("click", () => header.classList.remove("nav-open")));

document.getElementById("year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.08});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
