document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a");

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      document
        .querySelector(link.getAttribute("href"))
        .scrollIntoView({ behavior: "smooth" });
    });
  });
});
// Lightbox para imágenes
const images = document.querySelectorAll(".card img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

images.forEach(img => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.style.display = "flex";
  });
});

lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});
// Animación tipo lanzamiento Ferrari
const revealItems = document.querySelectorAll('.gallery-item, .video-container');

const revealOnScroll = () => {
  revealItems.forEach(item => {
    const top = item.getBoundingClientRect().top;
    const trigger = window.innerHeight * 0.85;

    if (top < trigger) {
      item.classList.add('reveal');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();
