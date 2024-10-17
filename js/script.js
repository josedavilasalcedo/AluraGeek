const themeToggleButton = document.querySelector('.header__theme-toggle');
const themeIcon = document.querySelector('.header__theme-icon');

themeToggleButton.addEventListener('click', () => {
  // Cambiar el tema agregando o quitando la clase 'dark-theme' al body
  document.body.classList.toggle('dark-theme');

  // Cambiar el icono del botón entre "moon" y "sun"
  if (document.body.classList.contains('dark-theme')) {
    themeIcon.src = './images/icon-sun.svg';  // Cambia el icono a "sol"
    themeToggleButton.setAttribute('aria-label', 'Cambiar a tema claro');  // Actualiza la accesibilidad
  } else {
    themeIcon.src = './images/icon-moon.svg';  // Cambia el icono a "luna"
    themeToggleButton.setAttribute('aria-label', 'Cambiar a tema oscuro');  // Actualiza la accesibilidad
  }
});

