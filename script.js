document.addEventListener("DOMContentLoaded", () => {

  // Scroll suave menú
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      document
        .querySelector(link.getAttribute("href"))
        .scrollIntoView({ behavior: "smooth" });
    });
  });

  // ===== LIGHTBOX SHOWROOM =====
  const images = document.querySelectorAll(".card img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const closeBtn = document.querySelector(".close");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  let currentIndex = 0;

  // ===== ZOOM VARIABLES =====
  let scale = 1;
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let translateX = 0;
  let translateY = 0;

  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentIndex = index;
      openLightbox();
    });
  });

  function openLightbox() {
    lightbox.style.display = "flex";
    lightboxImg.src = images[currentIndex].src;
    resetZoom();
  }

  function closeLightbox() {
    lightbox.style.display = "none";
    resetZoom();
  }

  closeBtn.addEventListener("click", closeLightbox);

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    openLightbox();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    openLightbox();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
  });

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });

  // ===== ZOOM CON RUEDA =====
  lightboxImg.addEventListener("wheel", e => {
    e.preventDefault();
    scale += e.deltaY < 0 ? 0.15 : -0.15;
    scale = Math.min(Math.max(1, scale), 4);
    applyTransform();
  });

  // ===== CLICK ZOOM =====
  lightboxImg.addEventListener("click", () => {
    scale = scale === 1 ? 2 : 1;
    translateX = 0;
    translateY = 0;
    applyTransform();
  });

  // ===== DRAG =====
  lightboxImg.addEventListener("mousedown", e => {
    if (scale === 1) return;
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    lightboxImg.classList.add("zoomed");
  });

  document.addEventListener("mousemove", e => {
    if (!isDragging) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    applyTransform();
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    lightboxImg.classList.remove("zoomed");
  });

  function applyTransform() {
    lightboxImg.style.transform =
      `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  }

  function resetZoom() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    applyTransform();
  }

});
