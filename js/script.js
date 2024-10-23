const searchIcon = document.getElementById('search-icon');
const mobileSearch = document.getElementById('mobile-search');
const botonCambioTema = document.querySelector('.header__theme-toggle');
const iconoTema = document.querySelector('.header__theme-icon');


// Cambiar entre tema claro y oscuro
function cambiarTema() {
  document.body.classList.toggle('dark-theme');

  iconoTema.src = document.body.classList.contains('dark-theme')
    ? './images/icon-sun.svg'
    : './images/icon-moon.svg';

  botonCambioTema.setAttribute('aria-label', document.body.classList.contains('dark-theme')
    ? 'Cambiar a tema claro'
    : 'Cambiar a tema oscuro');
}

// Evento para el botón
botonCambioTema.addEventListener('click', cambiarTema);

// Establecer tema según la hora local
(function () {
  const horaActual = new Date().getHours();

  if (horaActual >= 19 || horaActual < 7) {
    document.body.classList.add('dark-theme');
    iconoTema.src = './images/icon-sun.svg';
    botonCambioTema.setAttribute('aria-label', 'Cambiar a tema claro');
  } else {
    document.body.classList.remove('dark-theme');
    iconoTema.src = './images/icon-moon.svg';
    botonCambioTema.setAttribute('aria-label', 'Cambiar a tema oscuro');
  }
})();


searchIcon.addEventListener('click', () => {
  mobileSearch.style.display = mobileSearch.style.display === 'block' ? 'none' : 'block';
});

