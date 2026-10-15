// Menu mobile
const navToggle = document.getElementById("navToggle");
const mobileNav = document.getElementById("mobileNav");

if (navToggle && mobileNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Ouvrir le menu");
    });
  });
}

// Formulaire de contact : envoyé à Netlify Forms (les demandes arrivent dans
// Netlify > Forms, avec une notification par email à configurer).
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = contactForm.querySelector('button[type="submit"]');
    button.disabled = true;
    formStatus.className = "form-status";
    formStatus.textContent = "";

    try {
      const body = new URLSearchParams(new FormData(contactForm)).toString();
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (!response.ok) throw new Error("HTTP " + response.status);

      contactForm.reset();
      formStatus.classList.add("is-success");
      formStatus.textContent = "Merci ! Votre demande est bien arrivée. Nous vous rappelons sous 24 h ouvrées.";
    } catch (error) {
      formStatus.classList.add("is-error");
      formStatus.textContent = "L'envoi n'a pas fonctionné. Réessayez dans un instant ou écrivez-nous directement.";
    } finally {
      button.disabled = false;
    }
  });
}

// Vidéo de présentation : lecture avec le son au clic, puis commandes classiques
const promoVideo = document.getElementById("promoVideo");
const videoPlay = document.getElementById("videoPlay");

if (promoVideo && videoPlay) {
  videoPlay.addEventListener("click", () => {
    promoVideo.controls = true;
    promoVideo.closest(".video-frame").classList.add("is-playing");
    promoVideo.play();
  });
}
