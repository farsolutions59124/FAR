// FAR — interactions du site

/* =========================
   EMAILJS
========================= */

emailjs.init({
  publicKey: "p3ME3xIXOHdBrnXlH",
});


/* =========================
   Menu mobile
========================= */

const burger = document.getElementById("burger");
const navMobile = document.getElementById("nav-mobile");

function setMenu(open) {
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute(
    "aria-label",
    open ? "Fermer le menu" : "Ouvrir le menu"
  );

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


/* =========================
   Année du pied de page
========================= */

document.getElementById("year").textContent =
  String(new Date().getFullYear());


/* =========================
   Formulaire de contact
========================= */

const form = document.getElementById("contact-form");
const note = document.getElementById("form-note");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Vérification des champs
  const fields = [
    form.nom,
    form.email,
    form.message
  ];

  let valid = true;

  fields.forEach((field) => {
    const ok =
      field.value.trim() !== "" &&
      field.checkValidity();

    field.classList.toggle("invalid", !ok);

    if (!ok && valid) {
      field.focus();
      valid = false;
    }
  });

  if (!valid) return;


  // Envoi avec EmailJS
  emailjs.send(
    "service_kh3pk81",
    "template_5ijgkum",
    {
      nom: form.nom.value,
      email: form.email.value,
      projet: form.projet.value || "Non précisé",
      message: form.message.value
    }
  )
  .then(() => {

    // Message de succès
    note.hidden = false;
    note.textContent =
      "Votre demande a bien été envoyée. Merci !";

    // Réinitialisation du formulaire
    form.reset();

  })
  .catch((error) => {

    console.error("Erreur EmailJS :", error);

    note.hidden = false;
    note.textContent =
      "Une erreur est survenue. Veuillez réessayer.";

  });
});


/* =========================
   Apparition progressive
========================= */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => observer.observe(el));
