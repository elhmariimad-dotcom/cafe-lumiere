
"use strict";

// ============================================
// 1. DONNÉES DU MENU
// ============================================

// Les prix sont fictifs et exprimés en dirhams marocains.
const products = [
  {
    id: 1,
    name: "Espresso",
    category: "Cafés",
    description: "Un café intense, riche en arômes.",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1510707577719-ae7c14805e76?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 2,
    name: "Cappuccino",
    category: "Cafés",
    description: "Un espresso doux avec une mousse de lait.",
    price: 22,
    image:
      "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 3,
    name: "Latte",
    category: "Cafés",
    description: "Un café onctueux au lait velouté.",
    price: 25,
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 4,
    name: "Thé à la menthe",
    category: "Boissons",
    description: "Une pause parfumée inspirée de la tradition.",
    price: 12,
    image:
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 5,
    name: "Cheesecake",
    category: "Pâtisseries",
    description: "Un dessert crémeux pour les gourmands.",
    price: 30,
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 6,
    name: "Croissant",
    category: "Pâtisseries",
    description: "Une viennoiserie dorée et croustillante.",
    price: 12,
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80"
  }
];

// ============================================
// 2. SÉLECTION DES ÉLÉMENTS HTML
// ============================================

const productGrid = document.getElementById("product-grid");
const menuFilters = document.getElementById("menu-filters");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

// ============================================
// 3. AFFICHER LES PRODUITS
// ============================================

function displayProducts(category = "Tout") {
  // Filtrer les produits selon la catégorie choisie.
  const filteredProducts =
    category === "Tout"
      ? products
      : products.filter((product) => product.category === category);

  // Vider les anciennes cartes.
  productGrid.replaceChildren();

  // Créer une carte pour chaque produit.
  filteredProducts.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";

    // Afficher un texte si la photo ne charge pas.
    image.addEventListener("error", () => {
      image.alt = `${product.name} — photo indisponible`;
    });

    const info = document.createElement("div");
    info.className = "product-info";

    const categoryLabel = document.createElement("span");
    categoryLabel.className = "product-category";
    categoryLabel.textContent = product.category;

    const title = document.createElement("h3");
    title.textContent = product.name;

    const description = document.createElement("p");
    description.textContent = product.description;

    const bottom = document.createElement("div");
    bottom.className = "product-bottom";

    const price = document.createElement("span");
    price.className = "product-price";
    price.textContent = `${product.price} DH`;

    const order = document.createElement("a");
    order.className = "product-order";
    order.href =
      "https://wa.me/212600000000?text=" +
      encodeURIComponent(
        `Bonjour Café Lumière, je souhaite commander : ${product.name}.`
      );

    order.target = "_blank";
    order.rel = "noopener noreferrer";
    order.setAttribute(
      "aria-label",
      `Demander ${product.name} sur WhatsApp`
    );

    const orderText = document.createElement("span");
    orderText.textContent = "Commander";

    const orderIcon = document.createElement("i");
    orderIcon.setAttribute("data-lucide", "arrow-up-right");

    order.append(orderText, orderIcon);
    bottom.append(price, order);

    info.append(categoryLabel, title, description, bottom);
    card.append(image, info);
    productGrid.append(card);
  });

  // Générer les icônes des nouvelles cartes.
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// ============================================
// 4. CRÉER LES FILTRES DU MENU
// ============================================

function createFilters() {
  const categories = [
    "Tout",
    ...new Set(products.map((product) => product.category))
  ];

  categories.forEach((category, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className =
      index === 0 ? "filter-button active" : "filter-button";

    button.textContent = category;
    button.setAttribute("aria-pressed", index === 0 ? "true" : "false");

    button.addEventListener("click", () => {
      // Mettre à jour le bouton actif.
      menuFilters.querySelectorAll("button").forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-pressed", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      // Actualiser les produits.
      displayProducts(category);
    });

    menuFilters.append(button);
  });
}

// ============================================
// 5. MENU DE NAVIGATION MOBILE
// ============================================

function closeMobileMenu() {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Ouvrir le menu");

  const icon = menuToggle.querySelector("svg");

  if (icon) {
    icon.setAttribute("data-lucide", "menu");
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Fermer le menu" : "Ouvrir le menu"
  );

  const icon = menuToggle.querySelector("svg");

  if (icon) {
    icon.setAttribute(
      "data-lucide",
      isOpen ? "x" : "menu"
    );
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// Fermer le menu après avoir cliqué sur un lien.
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

// ============================================
// 6. ANNÉE AUTOMATIQUE DANS LE FOOTER
// ============================================

document.getElementById("year").textContent =
  new Date().getFullYear();

// ============================================
// 7. INITIALISATION
// ============================================

createFilters();
displayProducts("Tout");

// Les icônes sont chargées par le script externe.
if (window.lucide) {
  window.lucide.createIcons();
}
