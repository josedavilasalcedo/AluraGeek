// Elementos del DOM
const searchIcon = document.getElementById('search-icon');
const mobileSearch = document.getElementById('mobile-search');
const botonCambioTema = document.querySelector('.header__theme-toggle');
const iconoTema = document.querySelector('.header__theme-icon');
const cartCount = document.querySelector('.cart-count');
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// Inicializa el contador de items
let itemCount = 0;

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

// Evento para el botón de cambio de tema
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

// Evento para mostrar/ocultar búsqueda móvil
searchIcon.addEventListener('click', () => {
  mobileSearch.style.display = mobileSearch.style.display === 'block' ? 'none' : 'block';
});

// Función para añadir productos al carrito
function addProductToCart(productName, productPrice) {
  const item = document.createElement("li");
  item.className = "cart-modal__item";
  item.setAttribute("data-price", productPrice);
  item.innerHTML = `
        ${productName} - $${productPrice.toFixed(2)}
        <button class="remove-item">Eliminar</button>
    `;

  // Añadir evento al botón de eliminar
  const removeButton = item.querySelector(".remove-item");
  removeButton.addEventListener("click", () => {
    item.remove(); // Elimina el elemento del carrito
    itemCount--; // Decrementar el contador
    updateCartCount(); // Actualiza el contador
    updateCartTotal(); // Actualiza el total del carrito
  });

  cartItems.appendChild(item);
  // Actualizar el total
  updateCartTotal();
  // Incrementar el contador y actualizarlo
  itemCount++;
  updateCartCount(); // Llama a la función para actualizar el contador
}

// Función para actualizar el contador de items en el carrito
function updateCartCount() {
  cartCount.textContent = itemCount; // Actualiza el contador en el DOM
}

// Función para actualizar el total del carrito
function updateCartTotal() {
  let total = 0;
  const items = cartItems.querySelectorAll(".cart-modal__item");
  items.forEach(item => {
    const price = parseFloat(item.getAttribute("data-price"));
    total += price;
  });
  cartTotal.textContent = total.toFixed(2);
}

// Abrir y cerrar el carrito
document.addEventListener("DOMContentLoaded", () => {
  const cartButton = document.querySelector(".header_cars");
  const cartModal = document.getElementById("cart-modal");
  const closeCartButton = document.getElementById("close-cart");

  cartButton.addEventListener("click", () => {
    cartModal.classList.remove("hidden");
    cartModal.setAttribute("aria-hidden", "false");
  });

  closeCartButton.addEventListener("click", () => {
    cartModal.classList.add("hidden");
    cartModal.setAttribute("aria-hidden", "true");
  });

  // Llama a la función para cargar los productos al iniciar la aplicación
  fetchProducts();
});

// Fetch products
async function fetchProducts() {
  try {
    const response = await fetch('http://localhost:3000/productos');
    if (!response.ok) {
      throw new Error('Error en la solicitud: ' + response.statusText);
    }
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error('Hubo un problema con la solicitud:', error);
  }
}

// Mostrar productos en el contenedor
function displayProducts(products) {
  const productContainer = document.querySelector('.products__cards');
  productContainer.innerHTML = ''; // Limpiar contenedor antes de agregar productos

  products.forEach(product => {
    const productCard = `
            <div class="card">
                <img src="${product.imagen}" alt="${product.nombre}" />
                <div class="card-container--info">
                    <p class="card-container--name">${product.nombre}</p>
                    <p class="card-container--description">${product.descripcion}</p>
                    <div class="card-container--value">
                        <p class="card-container--price">$ ${product.precio.toFixed(2)}</p>
                        <p class="card-container--discount">Descuento: ${product.descuento}%</p>
                    </div>
                    <div class="card-container--actions">
                        <span class="card-container--availability">${product.disponible ? 'En Stock' : 'Agotado'}</span>
                        <button class="card-container--add-to-cart" 
                                data-name="${product.nombre}" 
                                data-price="${product.precio}">
                            Añadir al carrito
                        </button>
                        <img src="./images/icon-delete.svg" alt="Eliminar producto" class="card-container--delete" />
                    </div>
                </div>
            </div>
        `;
    productContainer.innerHTML += productCard;
  });

  // Seleccionar los botones después de que se hayan añadido al DOM y añadir el evento de clic
  const addToCartButtons = document.querySelectorAll(".card-container--add-to-cart");
  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const productName = button.getAttribute("data-name");
      const productPrice = parseFloat(button.getAttribute("data-price"));
      addProductToCart(productName, productPrice);
    });
  });
}

// Modal de login
document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('login-button');
  const loginModal = document.getElementById('login-modal');
  const closeModalButton = document.getElementById('close-modal');
  const loginForm = document.getElementById('login-form');
  const errorMessage = document.getElementById('error-message');

  // Abrir el modal de login al hacer clic en el botón de login
  loginButton.addEventListener('click', () => {
    loginModal.style.display = 'flex'; // Cambiar a 'flex' para mostrarlo como modal
  });

  // Cerrar el modal al hacer clic en la 'x'
  closeModalButton.addEventListener('click', () => {
    loginModal.style.display = 'none';
  });

  // Cerrar el modal al hacer clic fuera del contenido
  window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
      loginModal.style.display = 'none';
    }
  });

  // Manejo del formulario de login
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      // Obtiene los usuarios desde el servidor json-server
      const response = await fetch('http://localhost:3000/usuarios');
      const users = await response.json();

      // Verifica si el usuario y la contraseña son válidos
      const user = users.find(user => user.username === username && user.password === password);

      if (user) {
        // Redirige a la página de admin si las credenciales son correctas
        window.location.href = 'add-productos.html';
      } else {
        // Muestra un mensaje de error si las credenciales no coinciden
        errorMessage.textContent = 'Usuario o contraseña incorrectos';
        errorMessage.style.color = 'red'; // Colorea el mensaje de error en rojo
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      errorMessage.textContent = 'Hubo un problema al verificar las credenciales';
      errorMessage.style.color = 'red'; // Colorea el mensaje de error en rojo
    }
  });
});
