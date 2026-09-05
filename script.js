// FAR — interactions du site
// ⚠️ Remplacez cette adresse par votre vraie adresse e-mail :
const EMAIL_DESTINATION = "contact@example.com";

/* Menu mobile */
const burger = document.getElementById("burger");
const navMobile = document.getElementById("nav-mobile");

function setMenu(open) {
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  navMobile.hidden = !open;
}

burger.addEventListener("click", () => {
  setMenu(burger.getAttribute("aria-expanded") !== "true");
});

document.querySelectorAll("[data-close-menu]").forEach((el) => {
  el.addEventListener("click", () => setMenu(false));
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});

/* Année du pied de page */
document.getElementById("year").textContent = String(new Date().getFullYear());

/* Formulaire de contact */
const form = document.getElementById("contact-form");
const note = document.getElementById("form-note");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const fields = [form.nom, form.email, form.message];
  let valid = true;
  fields.forEach((field) => {
    const ok = field.value.trim() !== "" && field.checkValidity();
    field.classList.toggle("invalid", !ok);
    if (!ok && valid) {
      field.focus();
      valid = false;
    }
  });
  if (!valid) return;

  const body = [
    `Nom : ${form.nom.value}`,
    `Email : ${form.email.value}`,
    `Type de projet : ${form.projet.value || "Non précisé"}`,
    "",
    form.message.value,
  ].join("\n");

  window.location.href =
    `mailto:${EMAIL_DESTINATION}` +
    `?subject=${encodeURIComponent(`Nouveau projet — ${form.nom.value}`)}` +
    `&body=${encodeURIComponent(body)}`;

  note.hidden = false;
});

/* Apparition progressive */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
