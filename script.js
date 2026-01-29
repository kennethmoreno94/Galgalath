// Galgalath JS
// Este archivo está listo para futuras animaciones o interacciones

// Ejemplo: animación suave al hacer clic en el menú
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// En el futuro aquí puedes:
// - Cargar imágenes dinámicamente
// - Animaciones premium
// - Interacciones tipo showroom
