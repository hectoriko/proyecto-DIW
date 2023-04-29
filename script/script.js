// Inciciamos libreria AOS
AOS.init();

const delayHero = 2500;
let lastScrollPosition = document.documentElement.scrollTop;
let heroCounter = 1;
setInterval(heroSlideshow, delayHero);


// ====================
// Principal: Scroll
// ====================
// Asociamos el scroll con la función que gestiona la barra navegación
window.onscroll = () => showHideNav();

const lightboxImg = document.querySelector(
  ".lightbox-galeria__img-wrapper img",
);
const lightboxCaption = document.querySelector(
  ".lightbox-galeria__img-wrapper p",
);



// ====================
// Principal: Lightbox
// ====================
// Escuchamos el click en lightbox
// Fuera de las flechas o de la propia imágen
const lightboxGalery = document.querySelector(".lightbox-galeria");
lightboxGalery.addEventListener("click", function (e) {
  if (e.target.classList.contains("lightbox-galeria--activo")) toggleLightbox();
});

function toggleLightbox() {
  if (lightboxGalery.classList.contains("lightbox-galeria--activo")) {
    document.querySelector("body").style.overflow = "unset";
    lightboxGalery.classList.remove("lightbox-galeria--activo");
  } else {
    document.querySelector("body").style.overflow = "hidden";
    lightboxGalery.classList.add("lightbox-galeria--activo");
  }
}

function handleArrowClick(direction) {
  // Seleccionamos solo las img visibles para el lightbox, ignorando las ocultadas por las pestañas-filtro pestñas-filtro)
	const productos = document.querySelectorAll(".productos img:not(.hidden)");
  const productosSrc = [];
  productos.forEach(product => productosSrc.push(product.attributes.src.value));

  const activeSrc = lightboxImg.getAttribute("src");
  const currentIndex = productosSrc.indexOf(activeSrc);
  let targetIndex;

  if (direction === "next") {
    targetIndex = currentIndex + 1;
    if (targetIndex >= productos.length) targetIndex = 0;
  }

  if (direction === "prev") {
    targetIndex = currentIndex - 1;
    if (targetIndex < 0) targetIndex = productos.length - 1;
  }

  const productImage = productos[targetIndex].attributes.src.value;
  const productCaption = productos[targetIndex].dataset.caption;
  lightboxImg.src = productImage;
  lightboxCaption.textContent = productCaption;
}

// Escuchamos el click en las imágenes de la galería
const productos = document.querySelectorAll(".productos img:not(.hidden)");
productos.forEach(producto => {
  producto.addEventListener("click", function () {

    // Comprobamos cuantas imagenes hay visibles (por si el usuario ha usado las pestañas-filtro)
    const productosVisibles = document.querySelectorAll(".productos img:not(.hidden)");

    // Si hay solo 1 imagen visible, ocultamos las flechas del lightbox ya que no tienen sentido
		if (productosVisibles.length < 2) {
      document.querySelector(".next").style.display = "none";
			document.querySelector(".prev").style.display = "none";
		}
    // en caso contrario las mostramos
    else {
			document.querySelector(".next").style.display = "block";
			document.querySelector(".prev").style.display = "block";
		}
		const productImage = producto.getAttribute("src");
    const productCaption = producto.getAttribute("data-caption");
    lightboxImg.src = productImage;
    lightboxCaption.textContent = productCaption;
    toggleLightbox();
  });
});

// Escuchamos el click en la flecha siguiente
// Escuchamos el click en la flecha anterior
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const closeLightbox = document.querySelector(".lightbox-galeria__arrow.close");
next.addEventListener("click", () => handleArrowClick("next"));
prev.addEventListener("click", () => handleArrowClick("prev"));
closeLightbox.addEventListener("click", () => toggleLightbox());



// ====================
// Principal: Pestañas
// ====================
// Asociamos el click en la pestaña con la funcion que gestiona su click
const tabs = document.querySelectorAll(".pestanas__up h4");
tabs.forEach(pestana => {
  pestana.addEventListener("click", function () {
    handleTabs(this);
  });
});

function handleTabs(clickedTab) {
  // Eliminamos la clase activo de todas las pestañas
  for (let sibling of clickedTab.parentNode.children) {
    sibling.classList.remove("activo");
  }
  // Añadimos la clase activo a la pestaña clickada
  clickedTab.classList.add("activo");

  const sections = document.querySelectorAll(".pestanas__slide");
  const name = clickedTab.getAttribute("data-name");

  // Eliminamos la clase activo de todas las pestañas
  for (let section of sections) {
    section.classList.remove("activo");
    // Añadimos la clase activo a la sección cuyo data-name coincida con la pestaña clickada
    if (section.getAttribute("data-name") == name)
      section.classList.add("activo");
  }
}


// ====================
// Principal: Scroll
// ====================
function showHideNav() {
  let currentScrollPosition = document.documentElement.scrollTop;
  const nav = document.querySelector("#navigation");

  // 🚩 Podríamos controlar los estilos de la navegación directamente desde JS.
  // 🚩 O usar JS solo para añadir quitar clases que nos modifiquen los estilos.
  // 🚩 Voy a usar la primera forma
  // 🚩 Pero dejo la segunda forma comentada ya que es una buena práctica separar estilos de funcionalidad.
  // 🚩 En algunavideoconferencia comentabas que querías que sololohicieramos con JS, creo recordar que te referias al tooltip, pero lo dejo así por si acaso

  // Modificamos los estilos directamente desde JS
  if (currentScrollPosition < 150) {
    nav.style.padding = "1.5rem 1.2rem";
    nav.style.top = "0";
  }

  if (currentScrollPosition >= 150) {
    nav.style.padding = "1rem 1.2rem";
  }

  if (currentScrollPosition >= 800) {
    nav.style.top = "-65px";
  }

  if (lastScrollPosition > currentScrollPosition) {
    nav.style.top = "0";
  }

  // Usamos clases modificadoras para controlar los estilos y separarlo del JS
  // Además uso una sintaxis más concisa para los if cuando es posible

  // Para scroll menor a 150px, no modficamos la barra de navegación
  // if (currentScrollPosition < 150) {
  // 	nav.classList.remove('navigation--small', 'navigation--hidden')
  // }

  // A partir de 150, hacemos la barra de navegación menos alta
  // if (currentScrollPosition >= 150) nav.classList.add('navigation--small')

  // A partir de 800, ocultamos la barra de navegación
  // if (currentScrollPosition >= 800) nav.classList.add('navigation--hidden')

  // Cuando subimos mostramos la barra de navegación
  // if (lastScrollPosition > currentScrollPosition) nav.classList.remove('navigation--hidden')

  lastScrollPosition = currentScrollPosition;
}

// =====================
// Principal: Slideshow
// =====================
function heroSlideshow() {
  heroCounter++;

  // Ponemos el número máx. de imagenes que tenemos preparadas
  const totalImages = 3;
  if (heroCounter > totalImages) heroCounter = 1;

  // Asumiendo que todas las imagenes que usaremos se llaman igual, solo cambiamos la parte dinámica del nombre
  document.querySelector(
    "#hero",
  ).style.backgroundImage = `url(../media/hero${heroCounter}.jpg)`;
}


// ==================
// Principal: Modal
// ==================
const modalForm = document.querySelector(".modal-form");
modalForm.addEventListener("click", function (e) {
  if (e.target.classList.contains("modal-form--activo")) toggleModal();
});

function toggleModal() {
  if (modalForm.classList.contains("modal-form--activo")) {
    document.querySelector("body").style.overflow = "unset";
    modalForm.classList.remove("modal-form--activo");
  } else {
    const name = document.querySelector("#nombre").value;
    const phone = document.querySelector("#telefono").value;
    const email = document.querySelector("#email").value;

    document.querySelector("#modal-nombre").textContent = name;
    document.querySelector("#modal-telefono").textContent = phone;
    document.querySelector("#modal-email").textContent = email;

    document.querySelector("body").style.overflow = "hidden";
    modalForm.classList.add("modal-form--activo");
  }
}

const botonEnviarForm = document.querySelector("#enviar-form");
botonEnviarForm.addEventListener("click", function (e) {
	e.preventDefault();
  toggleModal();
});

const botonCerrarModal = document.querySelector(".modal-form__close");
botonCerrarModal.addEventListener("click", () => toggleModal());


// ===========================
// Complementaria: Acordeon
// ===========================
const closeFaqs = document.querySelectorAll(".faqs__close");
closeFaqs.forEach(closeButton => {
	// Asignamos un listener para cada boton
	closeButton.addEventListener("click", function (e) {
		var answer = this.parentNode.nextElementSibling;

		// Añadimos o quitamos la clase que muestra/oculta la respuesta
    if (answer.classList.contains("faqs__QA-block-down--hidden")) {
      answer.classList.remove("faqs__QA-block-down--hidden");
      closeButton.classList.remove("rotated");
    } else {
			answer.classList.add("faqs__QA-block-down--hidden");
      closeButton.classList.add("rotated");
    }
  });
});

// =========================
// Complementaria: Tooltip
// 100% desarrollado en JS
// =========================

// Seleccionamos los elementos que contienen el atributo data-tooltip
// De esta forma, con solo añadir ese atributo en el HTML y rellenarlo, creamo el tooltip
const tooltipItems = document.querySelectorAll("[data-tooltip]");
tooltipItems.forEach(item => {
  // Al hacer hover, creamos en nodo
  item.addEventListener("mouseenter", () => {
    // Primero comprobamos que no se haya creado ya. Si ya existe, paramos la ejecucion
    const alreadyCreated = item.parentNode.querySelector(".tooltip");
    if (alreadyCreated) return;

    // Si no existe, seguimos la ejecucion

    // Lo creamos y lo rellenamos
    const tooltip = document.createElement("p");
    tooltip.textContent = item.getAttribute("data-tooltip");
    tooltip.classList.add("tooltip"); // Le damos la clase tooltip, solo para controlar si ya existe unas lineas mas arriba

    // Damos posicion relativa al padre para que la posicion absoluta del tooltip haga efecto
    item.parentNode.style.position = "relative";

    // Damos estilos al tooltip usabndo un objeto
    const styles = {
      position: "absolute",
      top: "40%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontSize: "14px",
      padding: "8px 10px",
      backgroundColor: "gray",
      color: "white",
      borderRadius: "5px",
      pointerEvents: "none",
      boxShadow: "2px 2px 5px 0 rgba(0, 0, 0, 0.35)",
    };
    // Asigmos los estilos al tooltip
    Object.assign(tooltip.style, styles);

    // Agregamos el tooltip al padre
    item.parentNode.insertBefore(tooltip, item);
  });

  // Al salir del hover eliminamos en nodo
  item.addEventListener("mouseleave", () => {
    const tooltip = item.parentNode.querySelector(".tooltip");
    tooltip.remove();
  });
});


// =====================================
// Complementaria: Pestañas con filtro
// =====================================

// Seleccionamos los texto que hacen de filtro
const filters = document.querySelectorAll(".productos__filters [data-filter]");
filters.forEach(filter => {
	filter.addEventListener("click", function (e) {
		// Eliminamos la clase activo de todas las pestañas
    for (let sibling of filter.parentNode.children) {
			sibling.classList.remove("activo");
    }
    // Añadimos la clase activo a la pestaña clickada
    filter.classList.add("activo");

    const filterValue = this.getAttribute("data-filter");

    // const productos = document.querySelectorAll('.productos__item')
    const productos = document.querySelectorAll(".productos img");
    productos.forEach(producto => {
			// Si el atributo data-filter es igual a all, mostrar todos los productos
      // y paramos la ejecucion para no llegar al siguiente if
      if (filterValue === "all") {
				producto.classList.remove("hidden");
        return;
      }

      // Si el atributo data-filter de la pestaña seleccionada es igual al del producto
      // entonces mostramos el producto
      if (producto.getAttribute("data-filter") === filterValue) {
				producto.classList.remove("hidden");
      }
      // Si no, escondemos el producto
      else {
        producto.classList.add("hidden");
      }
    });
  });
});
